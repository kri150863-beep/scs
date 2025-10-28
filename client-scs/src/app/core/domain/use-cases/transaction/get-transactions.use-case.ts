import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Transaction } from "../../entities/transaction.entity";
import { TransactionApiService } from "../../../infrastructure/api/transaction.api.service";

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsUseCase {
    constructor(private transactionRepository: TransactionApiService) { }

    execute(page: number, pageSize: number, filter: { sort?: string }): Observable<{ data: Transaction[], total_length: number }> {
        return this.transactionRepository.getTransactions(page, pageSize, filter)
    }
}