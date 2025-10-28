import { Component, inject } from '@angular/core';
import { Document } from '../../../../core/domain/entities/document.entity';
import { DocumentService } from '../../../../core/infrastructure/services/document.service';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { dateFormat } from '../../../../core/shared/utils/date.util';
import { MatDialog } from '@angular/material/dialog';
import { DividendnoticeViewComponent } from './view/view.component';

@Component({
  selector: 'app-dividendnotice',
  imports: [TableComponent],
  templateUrl: './dividendnotice.component.html',
  styleUrl: './dividendnotice.component.scss'
})
export class DividendnoticeComponent {
  dividendNotes!: Document[]
  headers: any[] = [
    { id: "name", label: "Document Name", searchable: true },
    { id: "date", label: "Date Issued", sortable: true, dataFormat: dateFormat },
    { id: "fund_name", label: "Fund Name", searchable: true },
    { id: "actions", label: "Actions", specialType: "docviewdownload" },
  ]
  activeSort: { column: string; direction: "asc" | "desc" } = { column: '', direction: 'asc' }
  readonly dialog = inject(MatDialog)
  searchTerm: any;
  sortOption: string | null = null;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.loadDividendNotice()
    this.documentService.dividendNotice$.subscribe({
      next: (response) => this.dividendNotes = response,
      error: (err) => console.error('Error loading dividend notes:', err)
    })
  }

  loadDividendNotice() {
    const filter: any = {};

    if (this.sortOption) filter.sort = this.sortOption;
    if (this.searchTerm) filter.search = this.searchTerm;

    this.documentService.loadDividendNotice(filter);
    this.documentService.dividendNotice$.subscribe({
      next: (response) => this.dividendNotes = response,
      error: (err) => console.error('Error loading dividend notes:', err)
    })
  }

  formatValue(key: string, value: any) {
    const dataFormat = this.headers.find(({ id }) => id === key)?.dataFormat
    return dataFormat ? dataFormat(value) : value
  }

  formatDatas(datas: Document[]) {
    return datas.map((row: Document) => {
      return Object.keys(row).reduce((acc, key) => {
        const value = row[key as keyof Document]
        acc[key] = this.formatValue(key, value)
        return acc
      }, {} as Record<string, any>) as Document
    })
  }

  onView(index: number) {
    const { id } = this.dividendNotes[index]
    this.dialog.open(DividendnoticeViewComponent, {
      data: { id },
      width: "60vw",
      maxWidth: "100vw",
      height: "90vh",
      maxHeight: "100vh",
    })
  }

  onSearch({ column, value }: { column: string, value: string }): void {
    switch (column) {
      case "name":
        this.searchTerm = { column: "searchDocName", value };
        break;
      case "fund_name":
        this.searchTerm = { column: "searchFundName", value };
        break;
      default:
        break;
    }

    this.loadDividendNotice();
  }

  onDownload(index: number) {

  }

  toggleSort(column: string) {
    let newDirection: "asc" | "desc" = 'asc';

    if (this.activeSort.column === column)
      newDirection = this.activeSort.direction === 'asc' ? 'desc' : 'asc'

    this.activeSort = { column, direction: newDirection }
    this.sortOption = `${column}-${newDirection}`
    this.loadDividendNotice();
  }
}
