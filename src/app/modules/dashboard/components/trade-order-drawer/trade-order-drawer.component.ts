import { ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TradeDrawerService, NotificationService, StockDrawerObj, UserStore, UserDataStoreService, } from 'src/app/shared';
import { BehaviorSubject, distinctUntilChanged, firstValueFrom, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-trade-order-drawer',
  templateUrl: './trade-order-drawer.component.html',
  styleUrl: './trade-order-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TradeOrderDrawerComponent implements OnInit, OnChanges {
  values:any = {};
  //@Input() tradeOrder: any = {}
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
    ticker: new FormControl(this.localTradeObj.symbol, [Validators.required]),
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
        this.triggerBtn?.nativeElement.click();
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
      this.fetchPortfolios();
      this.cdr.detectChanges();
  }

  public async fetchPortfolios(): Promise<void> {
    this._userDataStoreService.userData.subscribe(async (data: UserStore | undefined) => {
      const userId = data?.userId;
      console.log("uid" + userId);
      if (userId) {
        this.userId = userId;
        const portfolios = await firstValueFrom(this._portfolioServices.getPorfolios(userId));
        this.userPortfolios.next(portfolios);
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

