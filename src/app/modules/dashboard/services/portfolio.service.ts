import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { Portfolio } from 'src/app/shared/interfaces/Portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getPorfolios(userId: number): Observable<Portfolio[]> {
    const url = this.buildUrl('/portfolios/' + userId);
    return this.http.get<Portfolio[]>(url);
  }
    private buildUrl(path: string): string {
      return `${environment.ORDER_SERVICE_BASE_URL}${path}`
    }
}