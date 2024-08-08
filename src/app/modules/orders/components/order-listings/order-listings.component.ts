import { Component, OnDestroy, OnInit} from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { environment } from 'environment';
import { UserDataStoreService, UserStore } from 'src/app/shared';
import { HttpClient } from '@angular/common/http';
import { GetOrdersDto } from 'src/app/shared/interfaces/Orders';
import { stocks } from 'src/app/shared/common/stocks';

interface Stock {
  name: string;
  symbol: string;
  icon: string;
}

interface Order {
  orderId: string;
  stock: Stock;
  type: String;
  side: String;
  status: String;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  date: String
}

@Component({
  selector: 'app-order-listings',
  templateUrl: './order-listings.component.html',
  styleUrl: './order-listings.component.scss'
})
export class OrderListingsComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  values: any = '';

  private unsubscribe: Subscription[] = [];
  totalOrders$ = of(0);
  currentPage = 0;
  pageSize = 5;


  tradesResult$: Observable<Order[]>; 
  datatableConfig: DataTables.Settings = {};
  typeof: any;

  constructor(
    private _userDataStoreService: UserDataStoreService,
    private _http: HttpClient,
  ) {
    const loadingSubscr = this.isLoading$.asObservable().subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getUserOrders();
    // this.tradesResult$.subscribe(data => this.totalOrders$ = of(data.length));
  }

  getUserOrders() {
    this.tradesResult$ = this._userDataStoreService.userData.pipe(
      map((data: UserStore | undefined) => data?.userId ?? -1),
      switchMap((userId: number) =>
        this._http.get<any>(`${environment.ORDER_SERVICE_BASE_URL}/orders/users/${userId}?page=${this.currentPage}&size=${this.pageSize}`).pipe(
          map((response: any) => {
            if (!response.data.orders) return []; 

            this.totalOrders$ = of(response.data.totalEntries);
            console.log(response.data.totalEntries);
            console.log(this.totalOrders$);
      
            return response.data.orders.map((order: GetOrdersDto) => ({
              orderId: order.id.toString(),
              stock: this.getStockByTicker(order.ticker),
              side: order.side,
              type: order.orderType,
              status: order.status,
              quantity: order.quantity,
              unitPrice: (order.orderType === 'MARKET' && order.status === 'PENDING') ? null : order.price,
              totalPrice: (order.orderType === 'MARKET' && order.status === 'PENDING') ? null : order.price * order.quantity,
              date: order.dateCreated,
            }));
          }),
          catchError((error: any) => {
            console.log(error);
            return of([]);
          })
        )
      )
    );
  }

  getStockByTicker(ticker: string): Stock {
    return stocks.find(stock => stock.symbol === ticker);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getUserOrders();
  }

    ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
