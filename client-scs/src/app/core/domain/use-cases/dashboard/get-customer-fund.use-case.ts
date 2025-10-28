import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DashboardRepository } from "../../repositories/dashboard.repository";

@Injectable({
  providedIn: 'root'
})
export class GetCustomerFundsUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  execute(userId: string, sort: any): Observable<any> {
    return this.dashboardRepository.getCustomerFunds(userId, sort);
  }
}