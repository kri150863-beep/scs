export interface Chart {
    id?: string;
    fnh_fund_id?: number;
    fnh_currency_id?: number;
    fund_name: string;
    fund_date?: string;
    nav_date?: string;
    avg_nav: any;
    c_name?: string;
    month_name: string;
    month_number: number;
    year: number;
    year_month: string;
    original?: any;
}

export interface Fund {
    reference: string;
    fund_name: string;
    no_of_shares: string;
    nav: string;
    total_amount_ccy: string;
    total_amount_mur: string;
    nav_date?: string;
    fund_date?: string;
}

export interface Nav {
    id: string;
    code_name: string;
    type_nav: string;
    value: string;
}

export interface ForexRates {
    id: string;
    code_name: string;
    value: string;
}

export interface LastValuationDate {
    nav_per_share: string;
    valuation_date: string;
}