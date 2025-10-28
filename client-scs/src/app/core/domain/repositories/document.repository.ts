import { Observable } from "rxjs";
import { Document } from "../entities/document.entity";

export abstract class DocumentRepository {
  abstract getStatements(filter: { sort?: string, search?: any }): Observable<Document[]>;
  abstract getFactsheets(filter: { sort?: string, search?: any  }): Observable<Document[]>;
  abstract getFactsheetById(id: string): Document;
  abstract getContractNotes(filter: { sort?: string, search?: any  }): Observable<Document[]>;
  abstract getContractNoteById(id: string): Document;
  abstract getDividendNotice(filter: { sort?: string, search?: any  }): Observable<Document[]>;
  abstract getDividendNoticeById(id: string): Document;
  abstract download(id: number): Observable<any>;
}
