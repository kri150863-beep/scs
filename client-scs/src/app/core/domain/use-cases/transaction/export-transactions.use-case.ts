import { Injectable } from "@angular/core";
import { ExportHeader } from "../../../shared/utils/export.util";
import { ExportFormat } from "../../entities/transaction.entity";
import { TransactionRepository } from "../../repositories/transaction.repository";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExportTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) { }

  execute(data: {
    userId: string,
    role: string,
    exportColumns: ExportHeader[],
    format: ExportFormat,
    startDate: string,
    endDate: string,
    status: string,
    page: number
  }): Observable<any> {
    return this.transactionRepository.exportTransactions(data)
  }
}