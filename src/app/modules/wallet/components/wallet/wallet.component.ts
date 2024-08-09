import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../../../_metronic/partials';
import { UserDataStoreService, UserStore, OrderApiClientService, NotificationService  } from 'src/app/shared';
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
    private _cdr: ChangeDetectorRef,
    private _apiClientService: OrderApiClientService,
    private _notificationService: NotificationService,
    private _userDataStoreService: UserDataStoreService) {}

  ngOnInit(): void {
    //this._userDataStoreService.readAll();
    this.userObj$ = this._userDataStoreService.userData;

    this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
      this.userData = data;
      console.log(this.userData);
      this.walletBalance = (data?.walletBalance)? data.walletBalance : 0 ;
      this._cdr.detectChanges();
    });

  }

  receiveData(data: string){
    console.log(`Received data from child: ${data}`);
    this.fundWallet(data);
  }

  public async fundWallet(amount:string): Promise<void> {
    const fundData = {
      "balance": parseInt(amount),
      "userId": this.userData?.userId?.toString()
    };
    console.log(fundData);
    this.processing = true;
    (await this._apiClientService.addApiService(`wallet/credit/${this.userData?.userId}`,  fundData)).subscribe(
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
              if (this.userData) {
                this.userData.walletBalance = (this.walletBalance || 0) + parseInt(amount);
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
