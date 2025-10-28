import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dateFormat as dF } from '../../../../../core/shared/utils/date.util';
import { numberFormat as nF } from '../../../../../core/shared/utils/number.util';
import { DocumentService } from '../../../../../core/infrastructure/services/document.service';
import { Document } from '../../../../../core/domain/entities/document.entity';
import { CommonModule } from '@angular/common';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ChartComponent } from '../../../../shared/ui/chart/chart.component';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
Chart.register(...registerables, DataLabelsPlugin);

@Component({
  selector: 'factsheets-view',
  imports: [ CommonModule, ChartComponent ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class FactsheetViewComponent {
  readonly dialogRef = inject(MatDialogRef<FactsheetViewComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)
  id = this.data.id
  factsheet!: Document
  dateFormat = dF
  numberFormat = nF

  graphical_performance: ChartData<'line'> = { labels: [], datasets: [] }
  calendar_performance: ChartData<'bar'> = { labels: [], datasets: [] }
  asset_mixes: ChartData<'pie'> = { labels: [], datasets: [] }

  constructor(private documentService: DocumentService) {}
  
  ngOnInit(): void {
    const fct = this.documentService.getFactsheetById(this.id)
    this.factsheet = fct

    const { graphical_performance: gp, calendar_performance: cp, asset_mixes: am } = fct
    if (gp) {
      const { funds, benchmark_yields } = gp
      let sortedFunds = funds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      let sortedBenchmark = benchmark_yields.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      const labels = sortedFunds.map(d => new Date(d.date).toLocaleString("en-US", { month: 'short', day: "2-digit" }))

      const fundsDatasets = sortedFunds.map(d => d.value)
      const benchmarkDatasets = sortedBenchmark.map(d => d.value)
      
      this.graphical_performance = {
        labels,
        datasets: [
          { data: fundsDatasets, label: 'Funds', fill: false, borderColor: "#f5d265", backgroundColor: "#f5d265", pointRadius: 0, pointHoverRadius: 0, tension: 0.4 },
          { data: benchmarkDatasets, label: 'Benchmark Yields', fill: false, borderColor: "#111111", backgroundColor: "#111111", pointRadius: 0, pointHoverRadius: 0, tension: 0.4 }
        ]
      }
    }
    if (cp) {
      const { funds, benchmark_yields } = cp
      const labels = funds.map(d => d.date)
      const fundsDatasets = funds.map(d => d.value)
      const benchmarkDatasets = benchmark_yields.map(d => d.value)

      this.calendar_performance = {
        labels,
        datasets: [
          { data: fundsDatasets, label: 'Funds', backgroundColor: "#f5d265" },
          { data: benchmarkDatasets, label: 'Benchmark Yields', backgroundColor: "#111111" }
        ]
      }

    }
    if (am) {
      const labels = am.map(d => d.category)
      const data = am.map(d => d.percentage)
      this.asset_mixes = {
        labels,
        datasets: [{ data, backgroundColor: [ "#c0c0c0", "#f5d265", "#111111", "#c0c0c0", "#a0a0a0" ] }]
      }
    }
  }

  get columns(): string[] {
    return this.factsheet.cumulative_performance?.map(d => d.column) ?? []
  }

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'black',
                formatter: (value) => value + "%"
            },
            tooltip: { enabled: false }
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false }, beginAtZero: true }
        }
  }

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        display: false
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } }
    }
  }
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        display: false
      },
    },
    rotation: 90
  }
}
