import { ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TradeDrawerService, StockDrawerObj, } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-trade-order-drawer',
  templateUrl: './trade-order-drawer.component.html',
  styleUrl: './trade-order-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeOrderDrawerComponent implements OnInit, OnChanges {


  values:any = {};
  //@Input() tradeOrder: any = {}
  localTradeObj:any = {};
  displaySlide:boolean =false;

  @ViewChild('triggerBtn') triggerBtn?: ElementRef<HTMLElement>;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  public traderObj$!: Observable<StockDrawerObj>;
  public objSubscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef, private _tds:TradeDrawerService) {
    this.traderObj$ = this._tds.switchState$;

    this.objSubscription = this.traderObj$.subscribe((data: StockDrawerObj)=>{
      
      if(data.state == "open"){
        this.localTradeObj = data.tradeObj;
        this.triggerBtn?.nativeElement.click();
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    //console.log(this.tradeOrder);
    //this.localTradeObj = this.tradeOrder;
      this.cdr.detectChanges();
  }

  ngOnChanges(changes:any):void {
    console.log("Chanages", changes);
   // this.localTradeObj = changes.tardeOrder;
  }

  displayStock(): void {
    this.displaySlide = !this.displaySlide;

    console.log("display");

    // console.log("display value", this.displaySlide);
    // //if(this.displaySlide){
    //   this.localTradeObj = this.tradeOrder;
    //   this.cdr.detectChanges();
    //   console.log("child component", this.tradeOrder);
    //   console.log("new component ", this.localTradeObj);
    // //}

      //this.triggerBtn?.nativeElement.click();
    
  }
}

