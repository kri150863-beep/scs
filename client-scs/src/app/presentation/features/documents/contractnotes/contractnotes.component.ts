import { Component, inject } from '@angular/core';
import { Document } from '../../../../core/domain/entities/document.entity';
import { DocumentService } from '../../../../core/infrastructure/services/document.service';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { dateFormat } from '../../../../core/shared/utils/date.util';
import { ContractnotesViewComponent } from './view/view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contractnotes',
  imports: [ TableComponent ],
  templateUrl: './contractnotes.component.html',
  styleUrl: './contractnotes.component.scss'
})
export class ContractnotesComponent {
  contractNotes!: Document[]
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
    this.loadContractNotes();
  }

  loadContractNotes() {
    const filter: any = {};

    if (this.sortOption) filter.sort = this.sortOption;
    if (this.searchTerm) filter.search = this.searchTerm;

    this.documentService.loadContractNotes(filter);
    this.documentService.contractNotes$.subscribe({
      next: (response) => this.contractNotes = response,
      error: (err) => console.error('Error loading statements:', err)
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

    this.loadContractNotes();
  }

  formatValue(key: string, value: any) {
    const dataFormat = this.headers.find(({ id }) => id === key)?.dataFormat
    return dataFormat ? dataFormat(value) : value
  }

  formatDatas(datas: Document[]) { return datas.map((row: Document) => {
    return Object.keys(row).reduce((acc, key) => {
        const value = row[key as keyof Document]
        acc[key] = this.formatValue(key, value)
        return acc
      }, {} as Record<string, any>) as Document
  }) }

  onView(index: number) {
    const { id } = this.contractNotes[index]
    this.dialog.open(ContractnotesViewComponent, { data: { id },
      width: "60vw",
      maxWidth: "100vw",
      height: "90vh",
      maxHeight: "100vh", })
  }

  onDownload(index: number) {

  }

  toggleSort(column: string) {
    let newDirection: "asc" | "desc" = 'asc';

    if (this.activeSort.column === column) 
      newDirection = this.activeSort.direction === 'asc' ? 'desc' : 'asc'

    this.activeSort = { column, direction: newDirection }
    const sort = `${column}-${newDirection}`
    this.sortOption = `${column}-${newDirection}`
    this.loadContractNotes();
  }
}
