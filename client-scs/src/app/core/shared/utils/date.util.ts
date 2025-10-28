import { formatDate } from "@angular/common"

export const dateFormat = (value: string | undefined): string => {
    if (!value) return "-"
    const [year, month, day] = value.split('-')
    const date = new Date(`${year}-${month}-${day}`)
    if (isNaN(date.getTime())) return "-"
    return formatDate(date, 'dd-MMM-yyyy', 'en-US')
}