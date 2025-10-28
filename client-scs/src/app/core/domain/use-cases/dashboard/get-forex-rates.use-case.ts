import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DashboardRepository } from "../../repositories/dashboard.repository";

@Injectable({
  providedIn: 'root'
})
export class GetForexRatesUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  execute(): Observable<any> {
    return this.dashboardRepository.getForexRates();
  }
}