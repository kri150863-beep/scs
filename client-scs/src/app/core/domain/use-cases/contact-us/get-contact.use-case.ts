import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DashboardRepository } from "../../repositories/dashboard.repository";
import { ContactRepository } from "../../repositories/contact.repository";

@Injectable({
  providedIn: 'root'
})
export class GetContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  execute(): Observable<any> {
    return this.contactRepository.getContact();
  }
}