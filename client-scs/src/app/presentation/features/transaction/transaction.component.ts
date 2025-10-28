import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/ui/table/table.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../../../core/domain/entities/transaction.entity';
import { TransactionService } from '../../../core/infrastructure/services/transaction.service';
import { dateFormat } from '../../../core/shared/utils/date.util';
import { numberFormat } from '../../../core/shared/utils/number.util';
import { AuthService } from '../../../core/infrastructure/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportDialogComponent } from './components/export-dialog/export-dialog.component';

@Component({
  selector: 'app-transaction',
  imports: [TableComponent, ButtonComponent, MatIconModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  user: any = null;
  itemsPerPageOptions: number[] = [6, 8, 10]
  itemsPerPage = this.itemsPerPageOptions[2]
  currentPage: number = 1
  dataLength: number = 0
  activeSort: { column: string; direction: "asc" | "desc" } = { column: 'date', direction: 'desc' }
  sortOption: string | null = null;
  searchTerm: any;
  headers: any[] = [
    { id: "date", label: "Date", sortable: true, dataFormat: dateFormat },
    { id: "fund_name", label: "Fund Name", searchable: true },
    { id: "sub_account_reference", label: "Sub account Reference", searchable: true },
    { id: "transaction_type", label: "Transaction Type", filterable: true },
    { id: "cn_number", label: "CN Number", searchable: true },
    { id: "no_of_units", label: "No of Units", sortable: true, dataFormat: numberFormat },
    { id: "net_amount_mur", label: "Net Amount (MUR)", sortable: true, dataFormat: numberFormat },
    { id: "currency", label: "Currency", filterable: true },
    { id: "net_amount_inv_redeemed", label: "Net Amount Invested / Redeemed", sortable: true, dataFormat: numberFormat }
  ]
  transactions!: Transaction[]
  transactionTypeOptions!: string[]
  filterOptions: { [key: string]: any[] } = {};
  filters: { [key: string]: any[] } = {};

  constructor(private transactionService: TransactionService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadFilterOptions();
  }

  loadTransactions() {
    const filter: any = {
      userId: this.user?.id ?? "",
      status: this.filters
    };

    if (this.sortOption) filter.sort = this.sortOption;
    if (this.searchTerm) filter.search = this.searchTerm;

    filter.userId = this.user?.id ?? "";
    this.transactionService.loadTransactions(this.currentPage, this.itemsPerPage, filter)
    this.transactionService.transactions$.subscribe({
      next: (response) => {
        this.transactions = response.data
        this.dataLength = response.total_length
      },
      error: (err) => console.error('Error loading transactions:', err)
    })
  }

  loadFilterOptions() {
    // Get transaction type
    this.transactionService.loadTransactionTypes().subscribe({
      next: (response) => {
        this.filterOptions['transaction_type'] = this.extractNames(response);
      },
      error: (err) => console.error('Error loading transaction types:', err)
    });

    // Get currency
    this.transactionService.loadCurrencies().subscribe({
      next: (response) => {
        this.filterOptions['currency'] = this.extractNames(response);
      },
      error: (err) => console.error('Error loading currencies:', err)
    });
  }

  onFilter(filterData: { column: string, values: any[] }): void {
    console.log(filterData);
    if (!this.filters) this.filters = {};

    if (filterData.values.length === 0) {
      delete this.filters[filterData.column];
    } else {
      switch (filterData.column) {
        case "transaction_type":
          this.filters['searchTransactionType'] = filterData.values;
          break;
        case "currency":
          this.filters['searchCurrency'] = filterData.values;
          break;
        case "fund_name":
          this.filters['searchFundName'] = filterData.values;
          break;
        default:
          break;
      }
    }

    this.loadTransactions();
  }

  formatValue(key: string, value: any) {
    const dataFormat = this.headers.find(({ id }) => id === key)?.dataFormat

    // Truncation for fund_name
    if (key === 'fund_name' && value && value.length > 15) {
      return dataFormat ? dataFormat(value.substring(0, 15) + '...') : value.substring(0, 15) + '...';
    }

    return dataFormat ? dataFormat(value) : value
  }
  
  formatDatas(datas: Transaction[]) {
    return datas.map((row: Transaction) => {
      return Object.keys(row).reduce((acc, key) => {
        const value = row[key as keyof Transaction]
        acc[key] = this.formatValue(key, value)
        return acc
      }, {} as Record<string, any>) as Transaction
    })
  }

  onPageChange(page: number) {
    this.currentPage = page
    this.loadTransactions();
  }

  handleItemsPerPageChange(pageSize: number) {
    this.itemsPerPage = pageSize
    this.currentPage = 1
    this.loadTransactions();
  }

  toggleSort(column: string) {
    let newDirection: "asc" | "desc" = 'asc';

    if (this.activeSort.column === column)
      newDirection = this.activeSort.direction === 'asc' ? 'desc' : 'asc'

    this.activeSort = { column, direction: newDirection }
    this.sortOption = `${column}-${newDirection}`
    this.loadTransactions();
  }

  onSearch({ column, value }: { column: string, value: string }): void {
    switch (column) {
      case "reference":
        this.searchTerm = { column: "searchReference", value };
        break;
      case "fund_name":
        this.searchTerm = { column: "searchFundName", value };
        break;
      case "sub_account_reference":
        this.searchTerm = { column: "searchSubAccountReference", value };
        break;
      case "cn_number":
        this.searchTerm = { column: "searchCnNumber", value };
        break;
      default:
        break;
    }

    this.loadTransactions();
  }

  // Fonction pour extraire les noms dans un tableau
  extractNames(items: any[]): string[] {
    return items.map(item => item.name);
  }

  // Fonction pour extraire les noms avec les IDs dans un tableau d'objets
  extractNamesWithIds(items: any[]): { name: string; id: number }[] {
    return items.map(item => ({ name: item.name, id: item.id }));
  }

  openExportDialog() {
    this.dialog.open(ExportDialogComponent, { data: {
      userId: this?.user?.id,
      transactions: this.formatDatas(this.transactions),
      exportColumns: this.headers,
      page: this.currentPage
    }})
  }
}
