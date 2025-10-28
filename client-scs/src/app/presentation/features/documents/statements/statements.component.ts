import { Component, inject, OnInit } from '@angular/core';
import { DocumentService } from '../../../../core/infrastructure/services/document.service';
import { Document } from '../../../../core/domain/entities/document.entity';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { dateFormat } from '../../../../core/shared/utils/date.util';
import { MatDialog } from '@angular/material/dialog';
import { StatementViewComponent } from './view/view.component';

@Component({
  selector: 'app-statements',
  imports: [ TableComponent ],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss'
})
export class StatementsComponent implements OnInit {
  statements!: Document[]
  headers: any[] = [
    { id: "name", label: "Document Name", searchable: true },
    { id: "date", label: "Date Issued", sortable: true, dataFormat: dateFormat },
    { id: "actions", label: "Actions", specialType: "docviewdownload" },
  ]
  activeSort: { column: string; direction: "asc" | "desc" } = { column: '', direction: 'asc' }
  readonly dialog = inject(MatDialog)
  searchTerm: any;
  sortOption: string | null = null;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadStatements();
  }

  loadStatements() {
    const filter: any = {};

    if (this.sortOption) filter.sort = this.sortOption;
    if (this.searchTerm) filter.search = this.searchTerm;

    this.documentService.loadStatements(filter);
    this.documentService.statements$.subscribe({
      next: (response) => this.statements = response,
      error: (err) => console.error('Error loading statements:', err)
    })
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
    const { id } = this.statements[index]
    this.dialog.open(StatementViewComponent, {
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
      default:
        break;
    }

    this.loadStatements();
  }

  onDownload(index: number) {

  }

  toggleSort(column: string) {
    let newDirection: "asc" | "desc" = 'asc';

    if (this.activeSort.column === column) 
      newDirection = this.activeSort.direction === 'asc' ? 'desc' : 'asc'

    this.activeSort = { column, direction: newDirection }
    this.sortOption = `${column}-${newDirection}`
    this.loadStatements();
  }
}
