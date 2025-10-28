import { map, Observable, of } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { ContactRepository } from "../../domain/repositories/contact.repository";
import { MOCK_CONTACT_US } from "../mock-backend/data/contact.mock-data";

@Injectable({
  providedIn: 'root'
})
export class ContactApiService implements ContactRepository {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getContact(): Observable<any> {
    if (environment?.useMockBackend) {
      return of(MOCK_CONTACT_US);
    }

    return this.http
      .get<any>(`${this.apiUrl}/contact-us`).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }
}