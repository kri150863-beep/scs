
import { Observable } from "rxjs";
import { ExportFormat, Transaction } from "../entities/transaction.entity";
import { ExportHeader } from "../../shared/utils/export.util";

export abstract class TransactionRepository {
  abstract getTransactions(page: number, pageSize: number, filter: { sort?: string }): Observable<{ data: Transaction[], total_length: number }>;
  abstract getTransactionTypes(): Observable<any>;
  abstract getCurrencies(): Observable<any>;
  abstract exportTransactions(data: { userId: string, role: string, exportColumns: ExportHeader[], format: ExportFormat, startDate: string, endDate: string, status: string, page: number }): Observable<Blob>;
  // abstract exportDetail(email: string, role: string, invoice_no: string | number): Observable<Blob>;
}