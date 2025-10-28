import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { Document } from "../../domain/entities/document.entity";
import { DocumentRepository } from "../../domain/repositories/document.repository";
import { MOCK_CONTRACTNOTES, MOCK_DIVIDENDNOTICE, MOCK_FACTSHEETS, MOCK_STATEMENTS } from "../mock-backend/data/documents.mock-data";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService implements DocumentRepository {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getStatements(filter: { sort?: string, search?: any }): Observable<any> {
    console.log(filter?.search);
    if (environment?.useMockBackend) {
      let data = MOCK_STATEMENTS
      if (filter?.sort) data = this.sort(data, filter.sort)
      return of(data)
    }

    let params = new HttpParams()
      .set('slug', "statements");

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.sort) {
      params = params.set('sortBy', filter.sort);
    }

    return this.http
      .get<any>(`${this.apiUrl}/documents`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getFactsheets(filter: { sort?: string, search?: any }): Observable<any> {
    if (environment?.useMockBackend) {
      let data = MOCK_FACTSHEETS
      if (filter?.sort) data = this.sort(data, filter.sort)
      return of(data)
    }

    let params = new HttpParams()
      .set('slug', "factsheets");

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.sort) {
      params = params.set('sortBy', filter.sort);
    }

    return this.http
      .get<any>(`${this.apiUrl}/documents`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getFactsheetById(id: string): Document {
    return MOCK_FACTSHEETS.find(doc => doc.id === id) ?? MOCK_FACTSHEETS[0]
  }

  getContractNotes(filter: { sort?: string, search?: any }): Observable<Document[]> {
    if (environment?.useMockBackend) {
      let data = MOCK_CONTRACTNOTES
      if (filter?.sort) data = this.sort(data, filter.sort)
      return of(data)
    }

    let params = new HttpParams()
      .set('slug', "contract-notes");

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.sort) {
      params = params.set('sortBy', filter.sort);
    }

    return this.http
      .get<any>(`${this.apiUrl}/documents`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getContractNoteById(id: string): Document {
    return MOCK_CONTRACTNOTES.find(doc => doc.id === id) ?? MOCK_CONTRACTNOTES[0]
  }

  getDividendNotice(filter: { sort?: string, search?: any }): Observable<Document[]> {
    if (environment?.useMockBackend) {
      let data = MOCK_DIVIDENDNOTICE
      if (filter?.sort) data = this.sort(data, filter.sort)
      return of(data)
    }

    let params = new HttpParams()
      .set('slug', "dividend-notices");

    if (filter?.search?.column && filter?.search?.value) {
      params = params.set(filter?.search?.column, filter?.search?.value);
    }

    if (filter?.sort) {
      params = params.set('sortBy', filter.sort);
    }

    return this.http
      .get<any>(`${this.apiUrl}/documents`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  getDividendNoticeById(id: string): Document {
    return MOCK_DIVIDENDNOTICE.find(doc => doc.id === id) ?? MOCK_DIVIDENDNOTICE[0]
  }

  download(id: number): Observable<any> {
    let params = new HttpParams()
      .set('documentId', id);

    return this.http
      .get<any>(`${this.apiUrl}/document/download`, { params }).pipe(
        map((response) => {
          return response?.data;
        })
      );
  }

  sort(list: Document[], sortBy: string): Document[] {
    switch (sortBy) {
      case 'date-asc':
        return [...list].sort((a, b) => new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime())
      case 'date-desc':
        return [...list].sort((a, b) => new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime())

      default:
        return list
    }
  }
}