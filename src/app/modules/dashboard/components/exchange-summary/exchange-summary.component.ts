import { Component, Input } from '@angular/core';
import { TradeDrawerService, StockDrawerObj, } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-exchange-summary',
  templateUrl: './exchange-summary.component.html',
  styleUrl: './exchange-summary.component.scss'
})
export class ExchangeSummaryComponent {
  @Input() color: string = '';
  @Input() exchangeName: string = '';
  @Input() stocks: Array<any> = [];
  constructor(private _tds:TradeDrawerService) {}

  triggerDrawer(orderData:any){
    console.log("Local Object", orderData);
    const order: StockDrawerObj = {
      state: 'open',
      tradeObj: orderData
    }

    this._tds.setSwitchState(order);

  }

}
