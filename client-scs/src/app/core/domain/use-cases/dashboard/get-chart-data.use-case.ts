import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DashboardRepository } from "../../repositories/dashboard.repository";

@Injectable({
  providedIn: 'root'
})
export class GetChartDataUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  execute({userId, fundName, period}: any): Observable<any> {
    return this.dashboardRepository.getChartData({userId, fundName, period});
  }
}