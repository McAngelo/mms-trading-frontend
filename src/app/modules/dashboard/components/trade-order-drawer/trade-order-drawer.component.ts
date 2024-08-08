import { ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TradeDrawerService, NotificationService, StockDrawerObj, UserStore, UserDataStoreService} from 'src/app/shared';
import { PortfolioService } from '../../';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { 
  BehaviorSubject, 
  distinctUntilChanged, 
  firstValueFrom, 
  map, of, switchMap, tap, 
  Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-trade-order-drawer',
  templateUrl: './trade-order-drawer.component.html',
  styleUrl: './trade-order-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOrderDrawerComponent implements OnInit, OnChanges {


  values:any = {};
  localTradeObj:any = {};
  displaySlide:boolean =false;

  @ViewChild('triggerBtn') triggerBtn?: ElementRef<HTMLElement>;
  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLElement>;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  public traderObj$!: Observable<StockDrawerObj>;
  public objSubscription!: Subscription;

  createOrderForm = new FormGroup({
    portfolioId: new FormControl('', Validators.required),
    userId: new FormControl('', [Validators.required]),
    ticker: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
    executionMode: new FormControl('SINGLE_EXCHANGE', [Validators.required]),
    preferredExchangeSlug: new FormControl('', [Validators.required]),
    price: new FormControl('', []),
    side: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    splitEnabled: new FormControl(false)
  });

  userPortfolios = new BehaviorSubject<{id: number, name: string}[]> ([{
    id: 1,
    name: 'Default Portfolio'
  }]);
  userId = 0;

  public userObj$!: Observable<UserStore>;
  //public objSubscription!: Subscription;
  public userData?: UserStore;

  constructor(
    private cdr: ChangeDetectorRef, 
    private _tds:TradeDrawerService, 
    private _notificationService: NotificationService,
    private _http: HttpClient,
    private fb: FormBuilder,
    private _userDataStoreService: UserDataStoreService,
    private _portfolioServices: PortfolioService,
  ) {
    this.traderObj$ = this._tds.switchState$;

    this.objSubscription = this.traderObj$.subscribe((data: StockDrawerObj)=>{
      
      if(data.state == "open"){
        this.localTradeObj = data.tradeObj;
        const ticker: string = this.localTradeObj.symbol;
        this.createOrderForm.patchValue({
          ticker: ticker,
        });
        this.triggerBtn?.nativeElement.click();
        this.cdr.detectChanges();
      }
    });

    
  }

  ngOnInit(): void {
    //console.log(this.tradeOrder);
    //this.localTradeObj = this.tradeOrder;
    this.fetchPortfolios();
      this.cdr.detectChanges();
  }

  public async fetchPortfolios(): Promise<void> {
    this.userObj$ = this._userDataStoreService.userData;
  
      this.objSubscription = this.userObj$.subscribe(async (data: UserStore | undefined) => {
        this.userData = data;

        const userId = data?.userId;
      console.log("data" + data);
      console.log("uid" + userId);
      if (userId) {
        this.userId = userId;
        console.log(userId);
        this.createOrderForm.patchValue({
          userId: userId.toString(),
        });
        const portfolios = this._portfolioServices.getPorfolios(userId);
        console.log(portfolios);
        //this.userPortfolios.next(portfolios);
        console.log(portfolios);
      } else {
        this.userPortfolios.next([]);
        console.log([]);
      }
        
      });
  }

  buy(createOrderForm: FormGroup) {
    createOrderForm.patchValue({ side: 'BUY' });
    this.executeTrade(createOrderForm);
  }

  sell(createOrderForm: FormGroup) {
    createOrderForm.patchValue({ side: 'SELL' });
    this.executeTrade(createOrderForm);
  }

  executeTrade(createOrderForm: FormGroup): void {
    console.log(this.localTradeObj);
    console.log(createOrderForm.value);
    if (!createOrderForm.valid) {
      console.log(createOrderForm.value);
      this._notificationService.showError('Provide the required information', 'Order Details Invalid')
      return;
    }

    this._http.post(environment.ORDER_SERVICE_BASE_URL  + '/orders', createOrderForm.value ).subscribe(
      (response) => {
       this._notificationService.showSuccess('','Successfully placed order')
      },
      (error: any) => {
        this._notificationService.showError('','Could not place order')
        console.log(error);
      }
    );
  }

  ngOnChanges(changes:any):void {
    //console.log("Chanages", changes);
   // this.localTradeObj = changes.tardeOrder;
  }

  executeOrder(action:string, model:any): void {

    this._notificationService.showInfo(`We are processing your ${action} orders`, `Executing ${action} Order`);
    this.closeBtn?.nativeElement.click();

  }
}

