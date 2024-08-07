import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandleService {
  private chartOptionsSource = new BehaviorSubject<any>({
    series: [
      {
        name: "candle",
        data: []
      }
    ],
    chart: {
      type: "candlestick",
      height: 350
    },
    title: {
      text: "CandleStick Chart",
      align: "left"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  });

  chartOptions$ = this.chartOptionsSource.asObservable();

  constructor() {
    this.pushDataContinuously();
  }

  private pushDataContinuously() {
    setInterval(() => {
      const newData = {
        x: new Date(),
        y: [
          this.getRandomValue(),
          this.getRandomValue(),
          this.getRandomValue(),
          this.getRandomValue()
        ]
      };

      const currentOptions = this.chartOptionsSource.value;
      currentOptions.series[0].data.push(newData);
      currentOptions.chart = {
        type: "candlestick",
        height: 350
      };
      currentOptions.title = {
        text: "CandleStick Chart",
        align: "left"
      };
      currentOptions.xaxis = {
        type: "datetime"
      };
      currentOptions.yaxis = {
        tooltip: {
          enabled: true
        }
      };

      this.chartOptionsSource.next(currentOptions);
    }, 5000); // Push data every second
  }

  private getRandomValue() {
    return Math.floor(Math.random() * 10000) / 100;
  }
}
