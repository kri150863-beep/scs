import { Component, inject } from '@angular/core';
import { DocumentService } from '../../../../core/infrastructure/services/document.service';
import { Document } from '../../../../core/domain/entities/document.entity';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { dateFormat } from '../../../../core/shared/utils/date.util';
import { filter } from 'rxjs';
import { FactsheetViewComponent } from './view/view.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-factsheets',
  imports: [ TableComponent ],
  templateUrl: './factsheets.component.html',
  styleUrl: './factsheets.component.scss'
})
export class FactsheetsComponent {
  factsheets!: Document[]
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
    this.loadFactsheets();
  }

  loadFactsheets() {
    const filter: any = {};

    if (this.sortOption) filter.sort = this.sortOption;
    if (this.searchTerm) filter.search = this.searchTerm;

    this.documentService.loadFactsheets(filter);
    this.documentService.factsheets$.subscribe({
      next: (response) => this.factsheets = response,
      error: (err) => console.error('Error loading factsheets:', err)
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
    const { id } = this.factsheets[index]
    this.dialog.open(FactsheetViewComponent, { data: { id },
      width: "80vw",
      maxWidth: "100vw",
      height: "90vh",
      maxHeight: "100vh", })
  }

  onDownload(id: number) {
    console.log(id);
    this.documentService.download(id).subscribe({
      next: (data) => {
        if(data?.url) this.dowloadFromUrl(data?.url);
      },
      error: (error) => {
        console.log(error);
      }
    });
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

    this.loadFactsheets();
  }

  toggleSort(column: string) {
    let newDirection: "asc" | "desc" = 'asc';

    if (this.activeSort.column === column) 
      newDirection = this.activeSort.direction === 'asc' ? 'desc' : 'asc'

    this.activeSort = { column, direction: newDirection }
    this.sortOption = `${column}-${newDirection}`
    this.loadFactsheets();
  }

  dowloadFromUrl(fileUrl: string): void {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = '';
    a.target = '_blank'
    a.click();
  }
}
