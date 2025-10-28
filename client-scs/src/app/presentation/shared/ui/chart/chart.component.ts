import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  imports: [ CommonModule, NgChartsModule ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() type: ChartType = 'bar'
  @Input() data!: ChartData
  @Input() options?: ChartOptions
}
