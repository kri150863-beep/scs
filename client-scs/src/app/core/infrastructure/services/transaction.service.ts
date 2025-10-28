import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ExportFormat, Transaction } from "../../domain/entities/transaction.entity";
import { GetTransactionsUseCase } from "../../domain/use-cases/transaction/get-transactions.use-case";
import { GetTransactionTypesUseCase } from "../../domain/use-cases/transaction/get-transaction-type.use-case";
import { GetCurrenciesUseCase } from "../../domain/use-cases/transaction/get-transaction-type.use-case copy";
import { ExportTransactionsUseCase } from "../../domain/use-cases/transaction/export-transactions.use-case";
import { ExportDetailsUseCase } from "../../domain/use-cases/transaction/export-detail.use-case";
import { ExportHeader } from "../../shared/utils/export.util";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<{ data: Transaction[], total_length: number }>({ data: [], total_length: 0 })
  transactions$ = this.transactionsSubject.asObservable()

  constructor(
    private getTransactionsUseCase: GetTransactionsUseCase,
    private getTransactionTypesUseCase: GetTransactionTypesUseCase,
    private getCurrenciesUseCase: GetCurrenciesUseCase,
    private exportTransactionsUseCase: ExportTransactionsUseCase,
    private exportDetailsUseCase: ExportDetailsUseCase
  ) { }

  loadTransactions(page: number = 1, pageSize: number = 10, filter: { sort?: string } = {},): void {
    this.getTransactionsUseCase.execute(page, pageSize, filter).subscribe(transactions => {
      this.transactionsSubject.next(transactions)
    })
  }

  loadTransactionTypes(): Observable<any> {
    return this.getTransactionTypesUseCase.execute();
  }

  loadCurrencies(): Observable<any> {
    return this.getCurrenciesUseCase.execute();
  }

  exportTransactions(data: { userId: string, role: any, exportColumns: ExportHeader[], format: ExportFormat, startDate: string, endDate: string, status: string, page: number }): void {
    this.exportTransactionsUseCase.execute(data).subscribe(transactions => {
      console.log(transactions);
    })
  }

  exportDetail(email: string, role: string, invoice_no: string | number): void {
    this.exportDetailsUseCase.execute(email, role, invoice_no)
  }
}