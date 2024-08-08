import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownMenusModule } from '../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import { WalletModule } from '../wallet/wallet.module';

import { 
  WalletSummaryComponent,
  ExchangeSummaryComponent,
  StocksComponent,
  CandleStickChartsComponent,
  ExchangeMarketBriefComponent,
  TradeOrderDrawerComponent,
  DashboardComponent

} from './';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminOverviewComponent } from './components/admin-dashboard/admin-overview/admin-overview.component';
import { AdminSystemComponent } from './components/admin-dashboard/admin-system/admin-system.component';
import { AdminHealthCheckComponent } from './components/admin-dashboard/admin-health-check/admin-health-check.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WalletSummaryComponent,
    ExchangeSummaryComponent,
    StocksComponent,
    CandleStickChartsComponent,
    ExchangeMarketBriefComponent,
    DashboardComponent,
    TradeOrderDrawerComponent,
    AdminDashboardComponent,
    AdminOverviewComponent,
    AdminSystemComponent,
    AdminHealthCheckComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InlineSVGModule,
    WidgetsModule,
    ModalsModule,
    SharedModule,
    NgApexchartsModule,
    DropdownMenusModule,
    WalletModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
