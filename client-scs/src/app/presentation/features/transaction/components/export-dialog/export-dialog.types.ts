import { Payment } from "../../../../../core/domain/entities/payment.entity";
import { Transaction } from "../../../../../core/domain/entities/transaction.entity";
import { ExportHeader } from "../../../../../core/shared/utils/export.util";

export interface DialogData {
    role?: string;
    email: string;
    userId: string;
    transactions: Transaction[];
    exportColumns: ExportHeader[];
    page: number;
}