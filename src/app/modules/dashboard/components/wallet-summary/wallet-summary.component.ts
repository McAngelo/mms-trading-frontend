import { ChangeDetectorRef, Component, Input, OnInit  } from '@angular/core';
import { UserDataStoreService, UserStore } from 'src/app/shared';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
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
  public walletBalance? = new BehaviorSubject(0);
  public totalPortfolio?: number;
  public availableStocks: number;
  public totalOrders: number;

  constructor(
    private cdr: ChangeDetectorRef, 
    private _userDataStoreService: UserDataStoreService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userObj$ = this._userDataStoreService.userData;

    this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
      this.userData = data;
      // this.walletBalance = (data?.wallet)? data.wallet[0]?.balance : 0 ;
      this.totalPortfolio = (data?.portfolios)? data.portfolios.length : 0;
      this.availableStocks = data?.availableStocks || 0;
      this.totalOrders = data?.totalOrders || 0;
      this.cdr.detectChanges();
    });

    this._http.get(environment.ORDER_SERVICE_BASE_URL  + '/wallet/' + this.userData?.userId).subscribe({
      next: (response: any) => {
        this.walletBalance?.next(response.data);
      }
    });
  }

}
