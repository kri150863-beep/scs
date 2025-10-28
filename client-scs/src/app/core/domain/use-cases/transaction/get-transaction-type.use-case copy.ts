import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { TransactionRepository } from "../../repositories/transaction.repository";

@Injectable({
  providedIn: 'root'
})
export class GetCurrenciesUseCase {
    constructor(private transactionRepository: TransactionRepository) { }

    execute(): Observable<any> {
        return this.transactionRepository.getCurrencies();
    }
}