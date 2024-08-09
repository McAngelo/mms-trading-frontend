import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthorityStore {
  authority?: string;
}

export interface RoleStore {
  id?: number;
  name?: string;
  createdDate?: string;
  lastModifiedDate?: string | null;
}


export interface WalletStore {
  id?: number;
  createdDate?: string;
  lastModifiedDate?: string | null;
  createdBy?: number;
  lastModifiedBy?: number | null;
  balance?: number;
  status?: string;
}

export interface UserStore {
  userId?: number;
  fullName?: string;
  email?: string;
  accountLocked?: boolean;
  enabled?: boolean;
  roles?: RoleStore[];
  portfolios?: any[];
  walletBalance?: number;
  availableStocks?: any;
  totalOrders?:any;
  createdDate?: string;
  lastModifiedDate?: string;
  name?: string;
  username?: string;
  authorities?: AuthorityStore[];
  credentialsNonExpired?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataStoreService {

  private _userData = new BehaviorSubject<UserStore>({});
  private _dataStore: { userData: UserStore } = { userData: {} };
  readonly userData = this._userData.asObservable();

  constructor() { }

  public readAll(){
    this._userData.next(Object.assign({}, this._dataStore).userData);
  }

  public create(userData: UserStore) {
    this._dataStore.userData = {};
    this._dataStore.userData = userData;
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this._userData.next(Object.assign({}, this._dataStore).userData);
  }


  public update(key: string, dataObj: UserStore){
    //let userData: userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this._dataStore.userData = dataObj;
    sessionStorage.setItem(key, JSON.stringify(dataObj));
    this._userData.next(Object.assign({}, this._dataStore).userData);
  }

  public remove(){
    this._dataStore.userData = {};
    sessionStorage.removeItem('userData')
    //this._userData.next(Object.assign({}, this._dataStore).userData);
  }
}
