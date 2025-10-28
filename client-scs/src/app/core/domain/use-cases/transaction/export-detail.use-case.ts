import { Injectable } from "@angular/core";
import { TransactionRepository } from "../../repositories/transaction.repository";

@Injectable({
  providedIn: 'root'
})
export class ExportDetailsUseCase {
    constructor(private transactionRepository: TransactionRepository) { }

    execute(email: string, role: string, invoice_no: string | number): void {
        // this.transactionRepository.exportDetail(email, role, invoice_no)
    }
}