import { Observable } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // or specific module
})

export abstract class DashboardRepository {
  abstract getCustomerNav(userId: string): Observable<any>;
  abstract getCustomerFunds(userId: string, sort: any): Observable<any>;
  abstract getForexRates(): Observable<any>;
  abstract getChartData({ userId, fundName, period }: any): Observable<any>;
  abstract getLastValuationDate(userId: string): Observable<any>;
}
