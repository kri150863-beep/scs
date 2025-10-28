import { Observable } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // or specific module
})

export abstract class ContactRepository {
  abstract getContact(): Observable<any>;
}