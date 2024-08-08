import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StockDrawerObj{
    state?: string;
    tradeObj?: any;
}

@Injectable({
  providedIn: 'root'
})
export class TradeDrawerService {
  private _stockDrawerObj = new BehaviorSubject<StockDrawerObj>({});
  private _dataStore: { stockDrawer: StockDrawerObj } = { stockDrawer: {} };

  // Observable to expose the current switch state
  switchState$ = this._stockDrawerObj.asObservable();

  // Method to toggle the switch state
  toggleSwitch(): void {
    this._stockDrawerObj.next(Object.assign({}, this._dataStore).stockDrawer);
  }

  // Method to set the switch state explicitly
  setSwitchState(state: any): void {
    this._stockDrawerObj.next(state);
  }

  // Method to get the current switch state
  getSwitchState(): any {
    return this._stockDrawerObj.value;
  }
}
