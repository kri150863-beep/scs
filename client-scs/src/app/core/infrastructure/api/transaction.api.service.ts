import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { ExportFormat, Transaction } from "../../domain/entities/transaction.entity";
import { environment } from "../../../../environments/environment";
import { MOCK_TRANSACTIONS } from "../mock-backend/data/transactions.mock-data";
import { TransactionRepository } from "../../domain/repositories/transaction.repository";
import { MOCK_TRANSACTION_TYPES } from "../mock-backend/data/transaction-types.mock-data";
import { MOCK_CURRENCIES } from "../mock-backend/data/currencies.mock-data";
import { ExportHeader, exportTableToCSV, exportTableToExcel, exportTableToPDF, triggerFileDownload } from "../../shared/utils/export.util";

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService implements TransactionRepository {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getTransactions(page: number, pageSize: number, filter: any): Observable<{ data: Transaction[], total_length: number }> {
    if (environment.useMockBackend) {
      let data = MOCK_TRANSACTIONS
      if (filter?.sort) data = this.sort(data, filter.sort)
      data = data.slice((page - 1) * pageSize, page * pageSize)
      return of({ data, total_length: MOCK_TRANSACTIONS.length })
    }

    // Real API implementation
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString())
      .set('userId', filter?.userId?.toString());

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.sort) {
      params = params.set('sortBy', filter.sort);
    }

    if (filter?.status) {
      Object.keys(filter.status).forEach(key => {
        params = params.set(key, filter.status[key].join(','));
      });
    }

    return this.http.get<any>(`${this.apiUrl}/transactions`, { params }).pipe(
      map((response) => {
        if (response && response?.status === 'success' && response?.data) {
          return { data: response?.data?.items, total_length: response?.data?.total_transaction };
        } else if (response && response?.id) {
          return response;
        } else if (Array.isArray(response) && response.length > 0) {
          return response[0];
        } else {
          return response;
        }
      }),
      catchError((error) => {
        console.error('ProfileApiService: HTTP error:', error);
        console.error('ProfileApiService: Error type:', typeof error);
        return throwError(() => error);
      })
    );
  }

  getTransactionTypes(): Observable<any> {
    if (environment.useMockBackend) {
      return of(MOCK_TRANSACTION_TYPES);
    }

    return this.http.get<any>(`${this.apiUrl}/transaction-types`).pipe(
      map((response) => {
        if (response && response?.status === 'success' && response?.data) {
          return response?.data;
        } else if (response && response?.id) {
          return response;
        } else if (Array.isArray(response) && response.length > 0) {
          return response[0];
        } else {
          return response;
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getCurrencies(): Observable<any> {
    if (environment.useMockBackend) {
      return of(MOCK_CURRENCIES);
    }

    return this.http.get<any>(`${this.apiUrl}/transactions/currency`).pipe(
      map((response) => {
        if (response && response?.status === 'success' && response?.data) {
          return response?.data;
        } else if (response && response?.id) {
          return response;
        } else if (Array.isArray(response) && response.length > 0) {
          return response[0];
        } else {
          return response;
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  sort(list: Transaction[], sortBy: string): Transaction[] {
    switch (sortBy) {
      case 'date-asc':
        return [...list].sort((a, b) => new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime())
      case 'date-desc':
        return [...list].sort((a, b) => new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime())

      case 'no_of_units-asc':
        return [...list].sort((a, b) => a.no_of_units - b.no_of_units)
      case 'no_of_units-desc':
        return [...list].sort((a, b) => b.no_of_units - a.no_of_units)

      case 'net_amount_mur-asc':
        return [...list].sort((a, b) => a.net_amount_mur - b.net_amount_mur)
      case 'net_amount_mur-desc':
        return [...list].sort((a, b) => b.net_amount_mur - a.net_amount_mur)

      case 'net_amount_inv_redeemed-asc':
        return [...list].sort((a, b) => a.net_amount_inv_redeemed - b.net_amount_inv_redeemed)
      case 'net_amount_inv_redeemed-desc':
        return [...list].sort((a, b) => b.net_amount_inv_redeemed - a.net_amount_inv_redeemed)

      default:
        return list
    }
  }

  exportTransactions(filter: {
    userId: string,
    role: string,
    exportColumns: ExportHeader[],
    format: ExportFormat,
    startDate: string,
    endDate: string,
    status: string,
    page: number
  }): Observable<any> {
    if (environment?.useMockBackend) {
      const data: Transaction[] = MOCK_TRANSACTIONS
      const filteredtransactions = data.filter((transaction) => {
        const date_submitted = new Date(transaction.date);
        const start = new Date(filter?.startDate);
        const end = new Date(filter?.endDate);
        return date_submitted >= new Date(start) && date_submitted <= new Date(end)
      })

      const filename = `Transactions_${filter?.startDate}_${filter?.endDate}`

      if (filter?.format === "csv") exportTableToCSV(filteredtransactions, filter?.exportColumns, filename)
      if (filter?.format === "excel") exportTableToExcel(filteredtransactions, filter?.exportColumns, filename)
      if (filter?.format === "pdf") exportTableToPDF(filteredtransactions, filter?.exportColumns, filename)
      return of(new Blob())
    }
    else {
      let params = new HttpParams()
        .set('page', filter?.page.toString())
        .set('userId', filter?.userId)
        .set('startDate', filter?.startDate)
        .set('endDate', filter?.endDate)
        .set('type', filter?.format)
      console.log(`${this.apiUrl}/transactions/export`);

      return this.http.get<any>(`${this.apiUrl}/transactions/export`, { params, responseType: 'blob' as 'json',
      observe: 'response' }).pipe(
        tap(response => {
        console.log('✅ API Response received, triggering download...');
        // Déclencher le téléchargement automatique
        triggerFileDownload(response.body, response.headers, filter.format, filter.startDate, filter.endDate);
      }),
      map(response => response.body), // Retourner le body pour les subscribers
      catchError(error => {
        console.error('❌ API Error:', error);
        return throwError(() => error);
      })
      )
    }
  }
}