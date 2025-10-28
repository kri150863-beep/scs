import { CommonModule, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../../core/infrastructure/services/sidebar.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgFor, RouterLinkActive, CommonModule, MatExpansionModule],
  // standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  dashboardLink = '/dashboard'
  documentsLink = '/documents'
  menuItems = [
    { label: 'Dashboard', icon: 'fas fa-regular fa-house', link: this.dashboardLink },
    { label: 'Transaction', icon: 'fas fa-regular fa-landmark', link: `${this.dashboardLink}/transaction` },
    { label: 'Documents', icon: 'fas fa-regular fa-folder', children: [
      { label: 'Statements', icon: 'fas fa-regular fa-file', link: `${this.dashboardLink}${this.documentsLink}/statements` },
      { label: 'Factsheets', icon: 'fas fa-regular fa-table-cells', link: `${this.dashboardLink}${this.documentsLink}/factsheets` },
      { label: 'Contract Notes', icon: 'fas fa-regular fa-book-bookmark', link: `${this.dashboardLink}${this.documentsLink}/contractnotes` },
      { label: 'Dividend Notice', icon: 'fas fa-regular fa-book-open', link: `${this.dashboardLink}${this.documentsLink}/dividendnotice` },
    ] },
    { label: 'Contact us', icon: 'fas fa-regular fa-phone', link: `${this.dashboardLink}/contact-us` },
    // { label: 'Claims', icon: 'fas fa-regular fa-gauge', link: '/dashboard/claims' },
    // { label: 'Payments', icon: 'fa-regular fa-credit-card', link: '/dashboard/payments' },
  ];

  constructor(public sidebarService: SidebarService) {}
}
