import { ChangeDetectorRef, Component } from '@angular/core';
import { IconUserModel } from '../../../../_metronic/partials';
import { HttpClient } from '@angular/common/http';
import { UserDataStoreService, UserStore } from 'src/app/shared';
import { environment } from 'environment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrl: './portfolio-overview.component.scss'
})
export class PortfolioOverviewComponent {
  private userData?: UserStore;
  public objSubscription!: Subscription;
  private userObj$!: Observable<UserStore>;
  public userPortofolios: {id: number, name: string}[];

  constructor(
    private _userDataStoreService: UserDataStoreService,
    private _http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userObj$ = this._userDataStoreService.userData;
      this.objSubscription = this.userObj$.subscribe((data: UserStore | undefined) => {
      this.userData = data;      
    });

    this._http.get(environment.ORDER_SERVICE_BASE_URL  + '/portfolios/' + this.userData?.userId).subscribe({
      next: (response: any) => {
        this.userPortofolios = response.data;
        this.cd.detectChanges();
      }
    });
  }
}
