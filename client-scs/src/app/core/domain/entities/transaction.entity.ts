export interface Transaction {
    transaction_id: number;
    date: string;
    fund_id?: number;
    fund_name: string;
    sub_account_reference: string;
    transaction_type: string;
    cn_number: string;
    no_of_units: number;
    net_amount_mur: number;
    currency: string;
    net_amount_inv_redeemed: number;
}

export interface TransactionTypes {
    id: string;
    name: string;
}

export interface Currency {
    id: string;
    name: string;
}

export type ExportFormat = 'csv' | 'excel' | 'pdf'