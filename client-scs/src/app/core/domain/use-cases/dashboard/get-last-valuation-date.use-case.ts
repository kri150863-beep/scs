import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DashboardRepository } from "../../repositories/dashboard.repository";

@Injectable({
  providedIn: 'root'
})
export class GetLastValuationDateUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  execute(userId: string): Observable<any> {
    return this.dashboardRepository.getLastValuationDate(userId);
  }
}