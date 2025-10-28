import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { environment } from '../../../../environments/environment';
import { DashboardRepository } from '../../domain/repositories/dashboard.repository';
import { MOCK_FOREX_RATES } from '../mock-backend/data/forex-rates.mock-data';
import { MOCK_FUNDS } from '../mock-backend/data/funds.mock-data';
import { MOCK_NAV } from '../mock-backend/data/nav.mock-data';
import { MOCK_CHART_DATA } from '../mock-backend/data/chart-data.mock-data';
import { MOCK_LAST_VALUATION_DATE } from '../mock-backend/data/last-valuation-date.mock-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService implements DashboardRepository {
  private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getCustomerNav(userId: string = ''): Observable<any> {
    if (environment?.useMockBackend) {
      return of(MOCK_NAV);
    }

    return this.http
      .get<any>(`${this.apiUrl}/nav-funds`, {
        params: new HttpParams().set('userId', userId),
      }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getCustomerFunds(userId: string = '', filters: any): Observable<any> {
    if (environment?.useMockBackend) {
      return of(MOCK_FUNDS);
    }

    let params = new HttpParams().set('userId', userId);

    if (filters?.search?.column && filters?.search?.value) {
      params = params.set(filters?.search?.column, filters?.search?.value);
    }

    if (filters?.sort) {
      params = params.set('sortBy', filters.sort);
    }

    return this.http
      .get<any>(`${this.apiUrl}/funds`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getLastValuationDate(userId: string = ''): Observable<any> {
    if (environment?.useMockBackend) {
      return of(MOCK_LAST_VALUATION_DATE);
    }

    return this.http
      .get<any>(`${this.apiUrl}/last-valuation-date`, {
        params: new HttpParams().set('userId', userId),
      }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getChartData({userId, fundName, period}: any): Observable<any> {
    if (environment?.useMockBackend) {
      // filter by fund name and period
      return of(this.filterData(fundName, period));
    }

    return this.http
      .get<any>(`${this.apiUrl}/funds`, {
        params: new HttpParams()
          .set('fundName', fundName)
          .set('period', period)
          .set('userId', userId),
      }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getForexRates(): Observable<any> {
    if (environment?.useMockBackend) {
      return of(MOCK_FOREX_RATES);
    }

    return this.http
      .get<any>(`${this.apiUrl}/forex-rates`)
      .pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  private filterData(fundName: string, period: string) {
    console.log(fundName, period);
    // filtrer sur le fond
    let data = MOCK_CHART_DATA;

    if (fundName !== 'ALL') {
      data = data.filter(d => d.fund_name === fundName);
    }

    // trier par date
    data = data.sort((a, b) => new Date(a.nav_date as any).getTime() - new Date(b.nav_date as any).getTime());

    // calculer la date limite selon la période
    const today = dayjs();
    let startDate: dayjs.Dayjs;

    switch (period) {
      case '1M':
        startDate = today.subtract(1, 'month');
        break;
      case '3M':
        startDate = today.subtract(3, 'month');
        break;
      case '6M':
        startDate = today.subtract(6, 'month');
        break;
      case 'YTD':
        startDate = dayjs().startOf('year');
        break;
      case '1Y':
        startDate = today.subtract(1, 'year');
        break;
      case 'ALL':
      default:
        startDate = dayjs('1900-01-01'); // tout
        break;
    }

    // filtrer selon la période
    return data.filter(d => dayjs(d.fund_date).isAfter(startDate));
  }
}
