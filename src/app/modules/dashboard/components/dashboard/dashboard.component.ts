import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../../../_metronic/partials';
import {  UserDataStoreService, UserStore, DashboardStoreService, ExchangeData } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userObj$!: Observable<UserStore>;
  public objSubscription!: Subscription;
  public userData?: UserStore;
  public adminRights: string = "";
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  stocks: Array<any> = [
    {
      name: 'Microsoft',
      symbol: 'MSFT',
      icon: './assets/media/svg/brand-logos/microsoft-5.svg',
      avgSell: 82,
      avgBuy: 64,
    },
    {
      name: 'Amazon',
      symbol: 'AMZN',
      icon: './assets/media/svg/brand-logos/amazon.svg',
      avgSell: 50,
      avgBuy: 55,
    },
    {
      name: 'NetFlix',
      symbol: 'NFLX',
      icon: './assets/media/svg/brand-logos/netflix.svg',
      avgSell: 12,
      avgBuy: 10,
    },
    {
      name: 'Google',
      symbol: 'GOOGL',
      icon: './assets/media/svg/brand-logos/google-icon.svg',
      avgSell: 190,
      avgBuy: 195,
    },
    {
      name: 'Apple',
      symbol: 'AAPL',
      icon: './assets/media/svg/brand-logos/apple-black.svg',
      avgSell: 200.5,
      avgBuy: 250.1,
    },
    {
      name: 'Tesla',
      symbol: 'TSLA',
      icon: './assets/media/svg/brand-logos/tesla.svg',
      avgSell: 20,
      avgBuy: 30,
    },
    {
      name: 'Oracle',
      symbol: 'ORCL',
      icon: './assets/media/svg/brand-logos/oracle.svg',
      avgSell: 45.3,
      avgBuy: 60.6,
    },
    {
      name: 'IBM',
      symbol: 'IBM',
      icon: './assets/media/svg/brand-logos/ibm-logo.svg',
      avgSell: 9.5,
      avgBuy: 10.2,
    },
  ];

  exchangeOneStocks: Array<any> = [
    {
      name: 'Apple',
      symbol: 'AAPL',
      icon: './assets/media/svg/brand-logos/apple-black.svg',
      avgSell: 200.5,
      percent: 25,
    },
    {
      name: 'Google',
      symbol: 'GOOGL',
      icon: './assets/media/svg/brand-logos/google-icon.svg',
      avgSell: 190,
      percent: 1.5,
    },
    {
      name: 'Oracle',
      symbol: 'ORCL',
      icon: './assets/media/svg/brand-logos/oracle.svg',
      avgSell: 45.3,
      percent: 0.6,
    },
  ];

  exchangeTwoStocks: Array<any> = [
    {
      name: 'NetFlix',
      symbol: 'NFLX',
      icon: './assets/media/svg/brand-logos/netflix.svg',
      avgSell: 12,
      percent: 10,
    },
    {
      name: 'Amazon',
      symbol: 'AMZN',
      icon: './assets/media/svg/brand-logos/amazon.svg',
      avgSell: 50,
      percent: 5.5,
    },
    {
      name: 'Microsoft',
      symbol: 'MSFT',
      icon: './assets/media/svg/brand-logos/microsoft-5.svg',
      avgSell: 82,
      percent: 6.4,
    },
    
  ];

  exchangeOneMarketBrief: Array<any> = [];
  exchangeTwoMarketBrief: Array<any> = [];

  exchangeMarketBrief = [
    {
      name: 'Microsoft',
      symbol: 'MSFT',
      icon: './assets/media/svg/brand-logos/microsoft-5.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'Amazon',
      symbol: 'AMZN',
      icon: './assets/media/svg/brand-logos/amazon.svg',      
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'NetFlix',
      symbol: 'NFLX',
      icon: './assets/media/svg/brand-logos/netflix.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'Google',
      symbol: 'GOOGL',
      icon: './assets/media/svg/brand-logos/google-icon.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'Apple',
      symbol: 'AAPL',
      icon: './assets/media/svg/brand-logos/apple-black.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'Tesla',
      symbol: 'TSLA',
      icon: './assets/media/svg/brand-logos/tesla.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'Oracle',
      symbol: 'ORCL',
      icon: './assets/media/svg/brand-logos/oracle.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
    {
      name: 'IBM',
      symbol: 'IBM',
      icon: './assets/media/svg/brand-logos/ibm-logo.svg',
      askPrice: 0.0,
      bidPrice: 0.0,
      avgSell: 0.0,
      avgBuy: 0.0,
      maxPriceShift: 0.0,
      lastTradedPrice: 0.0
    },
  ];

  private webSocket: WebSocket;
  myStock: ExchangeData = {};

  constructor(
    private cdr: ChangeDetectorRef, 
    private _dashboardStoreService: DashboardStoreService,
    private _userDataStoreService: UserDataStoreService) {
    this.webSocket = new WebSocket('ws://localhost:8082/market-stocks');
    //this.webSocket = new WebSocket('ws://localhost:8080/stocks');
    console.log(this.webSocket);
    this.webSocket.onmessage = (event) => {
      this.myStock = JSON.parse(event.data);
      //console.log(this.myStock);
      let checkStore = JSON.parse(sessionStorage.getItem('exchangeData') || '{}');
      if(Object.keys(checkStore).length === 0){
        this._dashboardStoreService.create(this.myStock);
      }else{
        this._dashboardStoreService.update("exchangeData", this.myStock);
      }

      this.cdr.detectChanges();
    };
  }

  updateExchangeMarketBrief(exchangeBrief: any, exchangeMarketBrief: any): any {

    exchangeMarketBrief.forEach((market:any) => {
      const marketR = exchangeBrief.find((brief:any) => brief.TICKER === market.symbol );
      if (marketR) {
        market.askPrice = marketR.ASK_PRICE;
        market.bidPrice = marketR.BID_PRICE;
        market.maxPriceShift = marketR.MAX_PRICE_SHIFT;
        market.lastTradedPrice = marketR.LAST_TRADED_PRICE;
        market.avgSell = marketR.SELL_LIMIT; 
        market.avgBuy = marketR.BUY_LIMIT;
      }
  });
  return exchangeMarketBrief;

}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.    
    this.userObj$ = this._userDataStoreService.userData;
  
      this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
        this.userData = data;
        this.adminRights = (data?.roles && data.roles[0]?.name !== undefined) 
                      ? data.roles[0]?.name.toString() 
                      : '0';
      });
  }

  getRandomValue(min: number, max: number) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnDestroy() {
    //this.disconnectSocket();
   }
}