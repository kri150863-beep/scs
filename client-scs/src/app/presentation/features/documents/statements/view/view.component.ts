import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'statement-view',
  imports: [ CommonModule ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class StatementViewComponent {
  readonly dialogRef = inject(MatDialogRef<StatementViewComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)
  id = this.data.id

  content = [
    { fund: "Swan Foreign Equity Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Foreign Equity Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Foreign Equity Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Foreign Equity Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Emerging Market Fund", currency: "MUR", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Emerging Market Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Emerging Market Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Emerging Market Fund", currency: "MUR", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Income Fund", currency: "USD", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Income Fund", currency: "USD", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Income Fund", currency: "USD", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Swan Income Fund", currency: "USD", shares: "#N/A", nav_per_share: "#N/A", ccy: "#N/A" },
    { fund: "Money Market Fund (USD) Nav as at 04 October 2024", currency: "USD", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy:"#N/A" },
    { fund: "Swan Private Equity (USD) Nav as at 30 September 2024", currency: "USD", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy:"#N/A" },
    { fund: "Money Market Fund (MUR) Nav as at 04 October 2024", currency: "USD", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy:"#N/A" },
    { fund: "Money Market Fund (EUR) Nav as at 04 October 2024", currency: "USD", ref_number: "#N/A", shares: "#N/A", nav_per_share: "#N/A", ccy:"#N/A" },
  ]

  getBg(index: number): string {
    if ([0, 1, 2, 3].includes(index)) return "#d9d9d9"
    if ([4, 5, 6, 7].includes(index)) return "#e2efda"
    if ([8, 9, 10, 11].includes(index)) return "#ddebf7"
    if ([12].includes(index)) return "#fff2cc"
    if ([13].includes(index)) return "#fce4d6"
    if ([14].includes(index)) return "#dfc9ef"
    if ([15].includes(index)) return "#ffccff"
    return "#ffffff"
  }
}
