import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Header } from './table.types';
import { MatIconModule } from '@angular/material/icon';
import {
  Download,
  EllipsisVertical,
  LucideAngularModule,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PaymentStatus } from '../../../../core/shared/constants/payment-status.const';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  imports: [
    MatIconModule,
    LucideAngularModule,
    CommonModule,
    NgxPaginationModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() headers: Header[] = [];
  @Input() rows: any[] = [];
  @Input() footerRows: any[] = [];
  @Input() statusSeverity: { [key: string]: string[] } = {};
  @Input() clickableRow: boolean = false;
  @Input() statusOptions: any[] = [];
  @Input() filterOptions: { [key: string]: any[] } = {};
  @Input() kebab: any = {};

  /** The pagination feature works only if paginationOptions is provided */
  @Input() paginationOptions!: {
    itemsPerPage: number;
    currentPage: number;
    itemsPerPageOptions: number[];
    totalItems?: number;
  };

  @Output() sort = new EventEmitter<string>();
  @Output() search = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<number>();
  @Output() download = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();
  @Output() paginate = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>()
  lucideIcons = { download: Download, verticalPoint: EllipsisVertical };

  itemsPerPage: number = 6;
  currentPage: number = 1;
  activeSearchHeader: string | null = null;
  headerSearchTerms: { [key: string]: string } = {};
  statusFilterToggled: boolean = false;
  selectedStatuses: string[] = [];
  openDropdownIndex: number | null = null;
  activeFilterHeader: string | null = null;
  filterValues: { [key: string]: any[] } = {};

  @ViewChildren('searchInput') searchInputRef!: QueryList<ElementRef>;
  @ViewChild('statusFilter') statusFilterRef!: ElementRef;
  @ViewChild('kebabActions') kebabRef!: ElementRef;
  @ViewChildren('filterInput') filterRefs!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.itemsPerPage = this.paginationOptions?.itemsPerPage;
    this.currentPage = this.paginationOptions?.currentPage;
  }

  toggleHeaderSearch(headerId: string) {
    if (this.activeSearchHeader === headerId) {
      // If clicking the same header's search icon, close it
      this.activeSearchHeader = null;
      this.headerSearchTerms[headerId] = '';
      // this.applyFilters();
    } else {
      // Open search for this header
      this.activeSearchHeader = headerId;
    }
  }

  onHeaderSearch(column: string, value: string): void {
    this.search.emit({ column, value });
  }

  onSearchEnter(column: string, value: string): void {
    console.log({ column, value });
    this.search.emit({ column, value });
    this.activeSearchHeader = null;
  }

  clearHeaderSearch(headerId: string) {
    this.headerSearchTerms[headerId] = '';
    // this.applyFilters();
    this.activeSearchHeader = null;
  }

  toggleStatusFilter() {
    this.statusFilterToggled = !this.statusFilterToggled;
  }

  toggleFilter(headerId: string) {
    if (this.activeFilterHeader === headerId) {
      this.activeFilterHeader = null;
    } else {
      this.activeFilterHeader = headerId;
    }
  }

  onFilterChange(headerId: string, value: any) {
    if (!this.filterValues[headerId]) {
      this.filterValues[headerId] = [];
    }
    
    if (this.filterValues[headerId].includes(value)) {
      this.filterValues[headerId] = this.filterValues[headerId].filter(v => v !== value);
    } else {
      this.filterValues[headerId] = [...this.filterValues[headerId], value];
    }
  }

  applyStatusFilterChange() {
    this.filter.emit(this.selectedStatuses);
    this.statusFilterToggled = false;
  }

  applyFilterChange(headerId: string) {
    this.filter.emit({ 
      column: headerId, 
      values: this.filterValues[headerId] 
    });
    this.activeFilterHeader = null;
  }

  clearFilters(headerId: string) {
    this.filterValues[headerId] = [];
    this.filter.emit({ 
      column: headerId, 
      values: [] 
    });
    this.activeFilterHeader = null;
  }

  toggleDropdown(event: Event, index: number) {
    event.stopPropagation();
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;

  const clickedInsideSearchInput = this.searchInputRef?.some(ref => ref.nativeElement.contains(target));
  const clickedInsideFilter = this.filterRefs?.some(ref => ref.nativeElement.contains(target));
  const clickedInsideKebab = this.kebabRef?.nativeElement.contains(target);

  if (!clickedInsideSearchInput) {
    this.activeSearchHeader = null;
  }

  if (!clickedInsideFilter) {
    this.activeFilterHeader = null;
  }

  if (!clickedInsideKebab) {
    this.openDropdownIndex = null;
  }
}

  handleKebabAction(event: Event, action: any, id: any) {
    event.stopPropagation();
    this.action.emit({ action, id });
    this.openDropdownIndex = null;
  }

  handleDownload(event: Event, index: number) {
    event.stopPropagation();
    this.download.emit(index);
  }
  
  handleView(event: Event, index: number) {
    event.stopPropagation()
    this.view.emit(index)
  }

  handleItemsPerPageChange(event: MatSelectChange) {
    const { value } = event;
    this.itemsPerPage = value as number;
    this.itemsPerPageChange.emit(value as number)
    this.paginate.emit(1);
  }

  getStatusSeverity(value: string) {
    return Object.entries(this.statusSeverity).find(([key, values]) =>
      values.includes(value)
    )?.[0];
  }

  isNew(status: string) {
    return status === PaymentStatus.NEW;
  }

  getTransactionTypeClass(transactionType: string): string {
    if (transactionType === 'Switch out') {
      return 'text-red-600 font-medium';
    } else {
      return 'text-green-600 font-medium';
    }
  }

  get iPPOptions(): number[] {
    const initial = this.paginationOptions?.itemsPerPageOptions;
    const choosen = this.itemsPerPage;
    const options =
      !initial.includes(choosen) && !!choosen ? [...initial, choosen] : initial;

    return Array.from(new Set(options)).sort((a, b) => a - b);
  }

  get pOptions() {
    return {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.paginationOptions?.currentPage,
      totalItems: this.paginationOptions?.totalItems ?? this.rows.length,
    };
  }
}
