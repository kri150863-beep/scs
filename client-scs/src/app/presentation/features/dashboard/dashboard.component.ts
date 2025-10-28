import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../../core/infrastructure/services/dashboard.service';
import { AuthService } from '../../../core/infrastructure/services/auth.service';
import dayjs from 'dayjs';
import { Fund, Nav } from '../../../core/domain/entities/dashboard.entity';
import { SortDirection } from '../../shared/ui/table/table.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatIconModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  period: string = 'ALL';
  fund: string = 'ALL';
  nav!: Nav[];
  funds!: Fund[];
  chartData!: any[];
  chartDatasets: { label: string; color: string }[] = [];
  currency: string = 'USD';
  user!: any;
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

  navPerShare = 'MUR 58.88';
  lastValuationDate = '01-Dec-2024';
  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: true },
      },
      y: {
        beginAtZero: false,
        ticks: {
          count: 5,
          callback: (value: any) => {
            const cName = this.currency;
            const formatter = new Intl.NumberFormat('fr-FR', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1
            });
            return `${this.currency} ${formatter.format(value)}`;
          },
        },
      },
    },
  };
  kebab = [
    {
      id: 'factsheets',
      label: 'Factsheets',
      children: [
        { id: 'mur', label: 'MUR' },
        { id: 'usd', label: 'USD' },
      ],
    },
    { id: 'contract-notes', label: 'Contract Notes' },
    { id: 'dividend-notice', label: 'Dividend Notice' },
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadNav(this.user?.id);
    this.loadFunds(this.user?.id);
    this.loadChart(this.user?.id);
    this.loadLastValuationDate(this.user?.id);
  }

  loadNav(userId: string = '') {
    this.dashboardService.getCustomerNav(userId).subscribe((res) => {
      this.nav = res;
    });
  }

  loadFunds(userId: string = '') {
    const filter: any = {};
    if (this.sortOption) filter.sort = this.sortOption || "reference-desc";
    if (this.searchTerm) filter.search = this.searchTerm;

    this.dashboardService
      .getCustomerFunds(userId, filter)
      .subscribe((res) => {
        this.funds = res;
      });
  }

  loadLastValuationDate(userId: string = '') {
    this.dashboardService.getLastValuationDate(userId).subscribe((res) => {
      this.navPerShare = res?.nav_per_share;
      this.lastValuationDate = res?.valuation_date;
    });
  }

  loadChart(userId: string = '') {
    this.dashboardService
      .getChartData({
        userId: userId,
        fundName: this.fund,
        period: this.period,
      })
      .subscribe((res) => {
        this.chartData = res;
        this.lineChartData = this.buildChartData();
        if (this.chart) {
          this.chart.update();
        }
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

    this.loadFunds(this.user?.id);
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

    this.loadFunds(this.user?.id);
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

  toggleSubmenu(actionId: string) {
    this.openSubmenu = this.openSubmenu === actionId ? null : actionId;
  }

  onFundChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    this.fund = selectedValue;
    this.loadChart(this.user?.id);
  }

  // Handle selection change
  onPeriodChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value as
      | '1M'
      | '3M'
      | '6M'
      | 'YTD'
      | '1Y'
      | 'ALL';

    this.period = selectedValue;
    this.loadChart(this.user?.id);
  }

  buildChartData(): ChartConfiguration<'line'>['data'] {
    // Grouper les données par fundName + cName
    const grouped: { [key: string]: any[] } = {};
    this.chartData.forEach((d) => {
      const currency = d.c_name || 'USD';
      const key = `${d.fund_name} (${currency})`;

      this.currency = currency;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(d);
    });

    const colors = [
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(255, 206, 86)',
      'rgb(54, 162, 235)',
    ];

    this.chartDatasets = [];
    const datasets = Object.keys(grouped).map((key, idx) => {
      const sorted = grouped[key].sort(
        (a, b) =>
          new Date(a.nav_date).getTime() - new Date(b.nav_date).getTime()
      );

      console.log(sorted);

      const color = sorted?.[0]?.color || colors[idx % colors.length];

      // stocker la couleur pour la légende
      this.chartDatasets.push({ label: key, color });

      return {
        data: sorted.map((d) => d.avg_nav),
        label: key, // Fund + cName
        borderColor: sorted?.[0]?.color || colors[idx % colors.length],
        backgroundColor: sorted?.[0]?.color || colors[idx % colors.length] + '33',
        fill: false,
        tension: 0,
        borderWidth: 1,
      };
    });

    // Labels adaptés selon la période
    const labels = this.chartData
      .map((d) => {
        const date = dayjs(d.nav_date);
        switch (this.period) {
          case '1M':
            return date.format('DD MMM'); // ex: 05 Dec
          case '3M':
          case '6M':
            return date.format('MMM'); // ex: Dec
          case '1Y':
            return date.format('MMM YYYY');
          case 'YTD':
          case 'ALL':
            return date.format('YYYY'); // ex: 2024
          default:
            return date.format('DD MMM YYYY');
        }
      })
      .filter((v, i, a) => a.indexOf(v) === i); // unique

    return { labels, datasets };
  }
}
