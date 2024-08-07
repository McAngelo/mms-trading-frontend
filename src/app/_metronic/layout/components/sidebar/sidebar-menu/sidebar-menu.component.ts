import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserDataStoreService, UserStore, ApiClientService, NotificationService  } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  public userObj$!: Observable<UserStore>;
  public objSubscription!: Subscription;
  public userData?: UserStore;
  public adminRights: string = "";
  constructor(
    cd: ChangeDetectorRef,
    private _apiClientService: ApiClientService,
    private _notificationService: NotificationService,
    private _userDataStoreService: UserDataStoreService) { }

    ngOnInit(): void {
      //this._userDataStoreService.readAll();
      this.userObj$ = this._userDataStoreService.userData;
  
      this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
        this.userData = data;
        this.adminRights = (data?.roles && data.roles[0]?.id !== undefined) 
                      ? data.roles[0]?.id.toString() 
                      : '0';
      });
    }

}
