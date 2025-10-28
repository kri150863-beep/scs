import {
  Observable
} from "rxjs";

import { Injectable } from "@angular/core";
import { GetCustomerFundsUseCase } from "../../domain/use-cases/dashboard/get-customer-fund.use-case";
import { GetCustomerNavsUseCase } from "../../domain/use-cases/dashboard/get-customer-nav.use-case";
import { GetForexRatesUseCase } from "../../domain/use-cases/dashboard/get-forex-rates.use-case";
import { GetChartDataUseCase } from "../../domain/use-cases/dashboard/get-chart-data.use-case";
import { GetLastValuationDateUseCase } from "../../domain/use-cases/dashboard/get-last-valuation-date.use-case";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private getCustomerNavUseCase: GetCustomerNavsUseCase,
    private getCustomerFundsUseCase: GetCustomerFundsUseCase,
    private getForexratesCase: GetForexRatesUseCase,
    private getChartDataUseCase: GetChartDataUseCase,
    private getLastValuationDateUseCase: GetLastValuationDateUseCase,
  ) { }

  getCustomerNav(userId: string): Observable<any> {
    return this.getCustomerNavUseCase.execute(userId);
  }

  getCustomerFunds(userId: string, sort: any): Observable<any> {
    return this.getCustomerFundsUseCase.execute(userId, sort);
  }

  getLastValuationDate(userId: string): Observable<any> {
    return this.getLastValuationDateUseCase.execute(userId);
  }

  getChartData({userId, fundName, period}: any): Observable<any> {
    return this.getChartDataUseCase.execute({userId, fundName, period});
  }

  getForexRates(): Observable<any> {
    return this.getForexratesCase.execute();
  }
}