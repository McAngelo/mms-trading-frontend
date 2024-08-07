import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { 
  WalletComponent, 
  HorizontalComponent,
  Step1Component, 
  Step2Component 
} from './';


@NgModule({
  declarations: [
    WalletComponent,
    HorizontalComponent,
    Step1Component,
    Step2Component
  ],
  imports: [
    CommonModule,
    ModalsModule, 
    WidgetsModule,
    NgbTooltipModule,
    InlineSVGModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    WalletComponent,
    HorizontalComponent
  ]
})
export class WalletModule { }
