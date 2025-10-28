export interface Document {
    id: string
    name: string
    date: string
    fund_name?: string
    total_amount?: number
    in_words?: string
    shares?: number
    nav_per_share?: number
    nav_price?: number
    total_fund_size?: number
    yield?: number
    base_currency?: string
    additional_dealing_currencies?: string
    benchmark?: string
    launch_date?: string
    isin?: string
    status?: string
    manager?: string
    local_custodian?: string
    foreign_custodian?: string
    dividend_distribution?: { period: string, dividend_paid: number }[]
    cumulative_performance?: { column: string, fund: number, benchmark_yield: number, benchmark: number }[]
    initial_service_charges?: string
    exit_fees?: string
    total_expenses_ratio?: string
    graphical_performance?: {
        funds: { date: string, value: number }[],
        benchmark_yields: { date: string, value: number }[]
    }
    calendar_performance?: {
        funds: { date: string, value: number }[],
        benchmark_yields: { date: string, value: number }[]
    }
    asset_mixes?: { category: string, percentage: number }[]
}