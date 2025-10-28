import { Injectable } from "@angular/core";
import { GetContactUseCase } from "../../domain/use-cases/contact-us/get-contact.use-case";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private getContactUseCase: GetContactUseCase,
  ) { }

  getContact(): Observable<any> {
    return this.getContactUseCase.execute();
  }
}