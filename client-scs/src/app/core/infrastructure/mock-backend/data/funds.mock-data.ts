import { Fund } from "../../../domain/entities/dashboard.entity";

export const MOCK_FUNDS: Fund[] = [
    {
        reference: 'SC123',
        fund_name: 'Swan Income Fund',
        no_of_shares: "1,000.00",
        nav: 'USD 10.13',
        total_amount_ccy: 'USD 10,130.00',
        total_amount_mur: '455,850.00'
    },
    {
        reference: 'SMF188',
        fund_name: 'Swan Money Market Fund - MUR',
        no_of_shares: "1,500.00",
        nav: 'MUR 58.88',
        total_amount_ccy: 'MUR 88,320.00',
        total_amount_mur: '88,320.00'
    },
    {
        reference: 'SMF189',
        fund_name: "Swan Money Market Fund - EUR",
        fund_date: "2025-09-08",
        no_of_shares: "1,500.00",
        nav: 'EUR 57.88',
        total_amount_ccy: 'EUR 87,320.00',
        total_amount_mur: '87,320.00'
    },
    {
        reference: 'SMF191',
        fund_name: "Swan Money - GBP",
        fund_date: "2025-09-08",
        no_of_shares: "1,500.00",
        nav: 'GBP 56.88',
        total_amount_ccy: 'GBP 85,320.00',
        total_amount_mur: '85,320.00'
    },
    {
        reference: 'SMF190',
        fund_name: "Swan Money Market Fund - USD",
        fund_date: "2025-09-08",
        no_of_shares: "1,500.00",
        nav: 'USD 56.88',
        total_amount_ccy: 'USD 85,320.00',
        total_amount_mur: '85,320.00'
    }
]