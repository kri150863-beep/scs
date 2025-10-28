import { da } from "@faker-js/faker";
import { Document } from "../../../domain/entities/document.entity";

export const MOCK_STATEMENTS: Document[] = [
    {
        id: "1",
        name: "AnnSmith_SummaryStatement.pdf",
        date: "2024-05-21",
    },
    {
        id: "2",
        name: "AnnSmith_FundsStatement.pdf",
        date: "2024-05-17"
    },
    {
        id: "3",
        name: "AnnSmith_PaymentStatement.pdf",
        date: "2024-05-02"
    }
]

export const MOCK_FACTSHEETS: Document[] = [
    {
        id: "1",
        name: "SC_USD_Factsheet_Nov2024.pdf",
        date: "2024-11-21",
        fund_name: "Swan Income Fund",
        nav_price: 10.25,
        total_fund_size: 35857359.40,
        yield: 4.6,
        base_currency: "USD",
        additional_dealing_currencies: "MUR, EUR, GBP",
        benchmark: "5-Year T-Note Futures Index",
        launch_date: "2019-07-15",
        isin: "MU07668500046",
        status: "Public Company",
        manager: "Swan Wealth Managers Ltd",
        local_custodian: "The Mauritius Commercial Bank Ltd",
        foreign_custodian: "Euroclear Bank",
        dividend_distribution: [
            {
                period: "Year 2020",
                dividend_paid: 3,
            },
            {
                period: "Year 2021",
                dividend_paid: 3,
            },
            {
                period: "Year 2022",
                dividend_paid: 3,
            },
            {
                period: "Year 2023",
                dividend_paid: 3.5,
            },
            {
                period: "March 2024 (First Interim dividend)",
                dividend_paid: 1.5,
            }
        ],
        initial_service_charges: "Up to 1.5%",
        exit_fees: "Up to 3.0%",
        total_expenses_ratio: "0.85% p.a.",
        cumulative_performance: [
            {
                column: "1M",
                fund: 0.3,
                benchmark_yield: 0.3,
                benchmark: 1.5
            },
            {
                column: "3M",
                fund: 1.0,
                benchmark_yield: 1.0,
                benchmark: 3.2
            },
            {
                column: "YTD",
                fund: 2.8,
                benchmark_yield: 3.3,
                benchmark: 0.9
            },
            {
                column: "1Y",
                fund: 3.8,
                benchmark_yield: 4.6,
                benchmark: 4.3
            },
            {
                column: "3Y",
                fund: 11.0,
                benchmark_yield: 11.4,
                benchmark: -11.1
            },
            {
                column: "5Y",
                fund: 17.2,
                benchmark_yield: 13.1,
                benchmark: -7.6
            },
            {
                column: "Since Inception",
                fund: 17.7,
                benchmark_yield: 13.5,
                benchmark: -6.8
            }
        ],
        graphical_performance: {
            funds: [
                {
                    date: "2024-09-19",
                    value: 100
                },
                {
                    date: "2024-07-20",
                    value: 103
                },
                {
                    date: "2024-05-21",
                    value: 105
                },
                {
                    date: "2024-03-22",
                    value: 108
                },
                {
                    date: "2024-01-23",
                    value: 110
                },
                {
                    date: "2023-11-23",
                    value: 112
                }

            ],
            benchmark_yields: [
                {
                    date: "2024-09-19",
                    value: 100
                },
                {
                    date: "2024-07-20",
                    value: 101
                },
                {
                    date: "2024-05-21",
                    value: 102
                },
                {
                    date: "2024-03-22",
                    value: 104
                },
                {
                    date: "2024-01-23",
                    value: 106
                },
                {
                    date: "2023-11-23",
                    value: 110
                }

            ],
        },
        calendar_performance: {
            funds: [
                {
                    date: "2019"/*"2019 (15-Jul-19 to 31-Dec-19)"*/,
                    value: 1.1
                },
                {
                    date: "2020",
                    value: 3.1
                },
                {
                    date: "2021",
                    value: 2.6
                },
                {
                    date: "2022",
                    value: 3
                },
                {
                    date: "2023",
                    value: 3.9
                },
                {
                    date: "YTD",
                    value: 2.8
                },

            ],
            benchmark_yields: [
                {
                    date: "2019"/*"2019 (15-Jul-19 to 31-Dec-19)"*/,
                    value: 0.7
                },
                {
                    date: "2020",
                    value: 0.5
                },
                {
                    date: "2021",
                    value: 0.9
                },
                {
                    date: "2022",
                    value: 3.1
                },
                {
                    date: "2023",
                    value: 4.3
                },
                {
                    date: "YTD",
                    value: 3.3
                },

            ],
        },
        asset_mixes: [
            {
                category: "Investment Grade",
                percentage: 95.3
            },
            {
                category: "Non investment",
                percentage: 3
            },
            {
                category: "Cash",
                percentage: 1.7
            }
        ]
        
    },
    {
        id: "2",
        name: "MMF_MUR_Factsheet_Nov2024.pdf",
        date: "2024-11-17",
        fund_name: "Swan Money Market Fund (MUR)",
        nav_price: 10.25,
        total_fund_size: 35857359.40,
        yield: 4.6,
        base_currency: "USD",
        additional_dealing_currencies: "MUR, EUR, GBP",
        benchmark: "5-Year T-Note Futures Index",
        launch_date: "2019-07-15",
        isin: "MU07668500046",
        status: "Public Company",
        manager: "Swan Wealth Managers Ltd",
        local_custodian: "The Mauritius Commercial Bank Ltd",
        foreign_custodian: "Euroclear Bank",
        dividend_distribution: [
            {
                period: "Year 2020",
                dividend_paid: 3,
            },
            {
                period: "Year 2021",
                dividend_paid: 3,
            },
            {
                period: "Year 2022",
                dividend_paid: 3,
            },
            {
                period: "Year 2023",
                dividend_paid: 3.5,
            },
            {
                period: "March 2024 (First Interim dividend)",
                dividend_paid: 1.5,
            }
        ],
        initial_service_charges: "Up to 1.5%",
        exit_fees: "Up to 3.0%",
        total_expenses_ratio: "0.85% p.a.",
        cumulative_performance: [
            {
                column: "1M",
                fund: 0.3,
                benchmark_yield: 0.3,
                benchmark: 1.5
            },
            {
                column: "3M",
                fund: 1.0,
                benchmark_yield: 1.0,
                benchmark: 3.2
            },
            {
                column: "YTD",
                fund: 2.8,
                benchmark_yield: 3.3,
                benchmark: 0.9
            },
            {
                column: "1Y",
                fund: 3.8,
                benchmark_yield: 4.6,
                benchmark: 4.3
            },
            {
                column: "3Y",
                fund: 11.0,
                benchmark_yield: 11.4,
                benchmark: -11.1
            },
            {
                column: "5Y",
                fund: 17.2,
                benchmark_yield: 13.1,
                benchmark: -7.6
            },
            {
                column: "Since Inception",
                fund: 17.7,
                benchmark_yield: 13.5,
                benchmark: -6.8
            }
        ],
        graphical_performance: {
            funds: [
                {
                    date: "2024-09-19",
                    value: 100
                },
                {
                    date: "2024-07-20",
                    value: 103
                },
                {
                    date: "2024-05-21",
                    value: 105
                },
                {
                    date: "2024-03-22",
                    value: 108
                },
                {
                    date: "2024-01-23",
                    value: 110
                },
                {
                    date: "2023-11-23",
                    value: 112
                }

            ],
            benchmark_yields: [
                {
                    date: "2024-09-19",
                    value: 100
                },
                {
                    date: "2024-07-20",
                    value: 101
                },
                {
                    date: "2024-05-21",
                    value: 102
                },
                {
                    date: "2024-03-22",
                    value: 104
                },
                {
                    date: "2024-01-23",
                    value: 106
                },
                {
                    date: "2023-11-23",
                    value: 110
                }

            ],
        },
        calendar_performance: {
            funds: [
                {
                    date: "2019"/*"2019 (15-Jul-19 to 31-Dec-19)"*/,
                    value: 1.1
                },
                {
                    date: "2020",
                    value: 3.1
                },
                {
                    date: "2021",
                    value: 2.6
                },
                {
                    date: "2022",
                    value: 3
                },
                {
                    date: "2023",
                    value: 3.9
                },
                {
                    date: "YTD",
                    value: 2.8
                },

            ],
            benchmark_yields: [
                {
                    date: "2019"/*"2019 (15-Jul-19 to 31-Dec-19)"*/,
                    value: 0.7
                },
                {
                    date: "2020",
                    value: 0.5
                },
                {
                    date: "2021",
                    value: 0.9
                },
                {
                    date: "2022",
                    value: 3.1
                },
                {
                    date: "2023",
                    value: 4.3
                },
                {
                    date: "YTD",
                    value: 3.3
                },

            ],
        },
        asset_mixes: [
            {
                category: "Investment Grade",
                percentage: 95.3
            },
            {
                category: "Non investment",
                percentage: 3
            },
            {
                category: "Cash",
                percentage: 1.7
            }
        ]
    }
]

export const MOCK_CONTRACTNOTES: Document[] = [
    {
        id: "1",
        name: "CN198_SC123_AnnSmith.pdf",
        date: "2024-05-21",
        fund_name: "Swan Income Fund",
        total_amount: 89626.27,
        in_words: "Eighty-Nine Thousand Six Hundred Twenty Six and Twenty Seven Cents",
        shares: 7388.81,
        nav_per_share: 12.13
    },
    {
        id: "2",
        name: "CN199_SMF188_AnnSmith.pdf",
        date: "2024-05-17",
        fund_name: "Swan Money Market Fund (MUR)",
        total_amount: 89626.27,
        in_words: "Eighty-Nine Thousand Six Hundred Twenty Six and Twenty Seven Cents",
        shares: 7388.81,
        nav_per_share: 12.13
    }
]

export const MOCK_DIVIDENDNOTICE: Document[] = [
    {
        id: "1",
        name: "SC_DividendNoticePaid_Oct2024_AnnSmith.pdf",
        date: "2024-10-21",
        fund_name: "Swan Income Fund"
    },
    {
        id: "2",
        name: "SMF_DividendNoticePaid_Oct2024_AnnSmith.pdf",
        date: "2024-10-17",
        fund_name: "Swan Money Market Fund (MUR)"
    }
]