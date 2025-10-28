import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/infrastructure/services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { Document } from '../../../../core/domain/entities/profile.entity';
import { MatIconModule } from '@angular/material/icon';
import { SortDirection } from '../../../shared/ui/table/table.types';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  selector: 'app-document-info',
  templateUrl: './document.component.html',
  styleUrls: [
    './document.component.scss',
    '../setting/setting.component.scss',
  ],
})
export class DocumentInfoComponent implements OnInit, OnDestroy {
  documents: any = [];
  activeSort: { column: string; direction: SortDirection } = {
      column: 'reference',
      direction: 'asc',
    };
    sortOption: string | null = null;
    openDropdownIndex: number | null = null;
    openSubmenu: string | null = null;
    searchTerm: any;
    activeSearchHeader: string | null = null;
    headerSearchTerms: { [key: string]: string } = {};

  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.subscribeToDocumentChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToDocumentChanges(): void {
    this.profileService.documents$
      .pipe(takeUntil(this.destroy$))
      .subscribe((documents) => {
        this.documents = documents;
      });
  }

  toggleHeaderSearch(headerId: string) {
      console.log(headerId, this.activeSearchHeader);
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
      this.onSearch({ column, value });
    }
  
    onSearchEnter(column: string, value: string): void {
      // console.log({ column, value });
      this.onSearch({ column, value });
      this.activeSearchHeader = null;
    }
  
    clearHeaderSearch(headerId: string) {
      this.headerSearchTerms[headerId] = '';
      // this.applyFilters();
      this.activeSearchHeader = null;
    }
  
    onSort(column: string): void {
      const newDirection: SortDirection =
        this.activeSort.column === column && this.activeSort.direction === 'asc'
          ? 'desc'
          : 'asc';
  
      this.activeSort = { column, direction: newDirection };
      const sort = `${column}-${newDirection}`;
  
      const newSort = this.sortOption === sort ? null : sort;
      this.sortOption = newSort;
  
      // this.loadFunds(this.user?.id);
    }
  
    onSearch({ column, value }: { column: string, value: string }): void {
      console.log({ column, value });
      switch (column) {
        case "reference":
          this.searchTerm = { column: "searchRef", value };
          break;
        case "fundName":
          this.searchTerm = { column: "searchFundName", value };
          break;
        default:
          break;
      }
  
      // this.loadFunds(this.user?.id);
    }
  
    toggleDropdown(event: Event, index: number) {
      event.stopPropagation();
      console.log(index);
      this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
    }
  
    handleKebabAction(event: Event, action: any, id: any) {
      event.stopPropagation();
      // this.action.emit({ action, id });
      this.openDropdownIndex = null;
    }
}
