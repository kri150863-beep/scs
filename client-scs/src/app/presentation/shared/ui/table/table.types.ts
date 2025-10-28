export type SortDirection = "asc" | "desc"
export type SpecialType = "status" | "download" | "claim" | "docviewdownload"

export type Header = {
    id: string,
    label: string
    sortable?: boolean
    searchable?: boolean
    filterable?: boolean
    specialType?: SpecialType
}