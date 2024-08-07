import { Component, Input, OnInit  } from '@angular/core';
import { UserDataStoreService, UserStore } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-wallet-summary',
  templateUrl: './wallet-summary.component.html',
  styleUrl: './wallet-summary.component.scss'
})
export class WalletSummaryComponent implements OnInit {
  @Input() color: string = '';

  public userObj$!: Observable<UserStore>;
  public objSubscription!: Subscription;
  public userData?: UserStore;
  public walletBalance?: number;
  public totalPortfolio?: number;
  public availableStocks: number;
  public totalOrders: number;

  constructor(private _userDataStoreService: UserDataStoreService) {}

  ngOnInit(): void {
    //this._userDataStoreService.readAll();
    this.userObj$ = this._userDataStoreService.userData;

    this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
      this.userData = data;
      this.walletBalance = (data?.wallet)? data.wallet[0]?.balance : 0 ;
      this.totalPortfolio = (data?.portfolios)? data.portfolios.length : 0;
      this.availableStocks = data?.availableStocks || 0;
      this.totalOrders = data?.totalOrders || 0;
    });
  }

}
