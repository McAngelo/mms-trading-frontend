import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../../../_metronic/partials';
import { UserDataStoreService, UserStore, ApiClientService, NotificationService  } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType, HttpEvent, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit{
  modalConfig: ModalConfig = {
    modalTitle: 'Fund Wallet',
    //dismissButtonLabel: 'Submit',
    //closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  public userObj$!: Observable<UserStore>;
  public objSubscription!: Subscription;
  public userData?: UserStore;
  public walletBalance?: number;
  public walletId: string = '';
  public totalPortfolio?: number;
  public availableStocks: number;
  public totalOrders: number;

  public processing: boolean = false;
  public hasError: boolean = false;
  public errorMsg: string = "";

  constructor(
    cd: ChangeDetectorRef,
    private _apiClientService: ApiClientService,
    private _notificationService: NotificationService,
    private _userDataStoreService: UserDataStoreService) {}

  ngOnInit(): void {
    //this._userDataStoreService.readAll();
    this.userObj$ = this._userDataStoreService.userData;

    this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
      this.userData = data;
      console.log(this.userData);
      this.walletBalance = (data?.wallet)? data.wallet[0]?.balance : 0 ;
      //this.walletId = (data?.wallet)? data.wallet[0]?.id?.toString() : '0' ;
      this.walletId = (data?.wallet && data.wallet[0]?.id !== undefined) 
                      ? data.wallet[0]?.id.toString() 
                      : '0';
    });
  }

  receiveData(data: string){
    console.log(`Received data from child: ${data}`);
    this.fundWallet(data);
  }

  public async fundWallet(amount:string): Promise<void> {
    const fundData = {
      "balance": parseInt(amount),
      "status": "ACTIVE",
      "userId": this.userData?.userId
    };
    console.log(fundData);
    this.processing = true;
    (await this._apiClientService.updateApiService(`wallet/update`, this.walletId, fundData)).subscribe(
      (event: HttpEvent<any>): any => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.processing = true;
            break;
          case HttpEventType.Response:
            this.processing = false;
            let {status, data, message, error} = event.body;
            console.log({status, data, message, error});
            if(status == 200){
              this.closeModal();
              this._notificationService.showSuccess('Wallet funded successfully', 'Success');
              if (this.userData && this.userData.wallet && this.userData.wallet[0]) {
                this.userData.wallet[0].balance = parseInt(amount);
                this._userDataStoreService.update("userData", this.userData);
              }
              //this.getAllCompanies();
            }else{
              this.hasError = true;
              this.errorMsg = 'something went wrong please contact Technical Support';
            }
        }
      },
      (errorObj:any) => {
        this.processing = false;
        const errorMsg = errorObj?.error?.Message;
        this.hasError = true;
        this.errorMsg = errorMsg || 'something went wrong please contact Technical Support';
      }
    );
  }

  async closeModal(){
    return await this.modalComponent.close();
  }

  async openModal() {
    return await this.modalComponent.open();
  }
}
