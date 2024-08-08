import { Component, Input } from '@angular/core';
import { TradeDrawerService, StockDrawerObj, } from 'src/app/shared';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent {
  @Input() stocks: Array<any> = [];
  constructor(private _tds:TradeDrawerService) {}

  triggerDrawer(orderData:any){
    const order: StockDrawerObj = {
      state: 'open',
      tradeObj: orderData
    }
    
    this._tds.setSwitchState(order);

  }
}
