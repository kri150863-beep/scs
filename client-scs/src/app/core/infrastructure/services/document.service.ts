import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Document } from "../../domain/entities/document.entity";
import { GetStatementsUseCase } from "../../domain/use-cases/document/get-statements.use-case";
import { GetFactsheetsUseCase } from "../../domain/use-cases/document/get-factsheets.use-case";
import { GetContractNotesUseCase } from "../../domain/use-cases/document/get-contractnotes.use-case";
import { GetDividendNoticeUseCase } from "../../domain/use-cases/document/get-dividendnotice.use-case";
import { ContractNoteByIdUseCase } from "../../domain/use-cases/document/contractnotes-by-id.use-case";
import { DividendNoticeByIdUseCase } from "../../domain/use-cases/document/dividendnotice-by-id.use-case";
import { FactsheetByIdUseCase } from "../../domain/use-cases/document/factsheet-by-id.use-case";
import { DownloadUseCase } from "../../domain/use-cases/document/download.use-case";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private statementsSubject = new BehaviorSubject<Document[]>([])
  statements$ = this.statementsSubject.asObservable()

  private factsheetsSubject = new BehaviorSubject<Document[]>([])
  factsheets$ = this.factsheetsSubject.asObservable()

  private contractNotesSubject = new BehaviorSubject<Document[]>([])
  contractNotes$ = this.contractNotesSubject.asObservable()

  private dividendNoticeSubject = new BehaviorSubject<Document[]>([])
  dividendNotice$ = this.dividendNoticeSubject.asObservable()

  constructor(
    private getStatementsUseCase: GetStatementsUseCase,
    private getFactsheetsUseCase: GetFactsheetsUseCase,
    private factsheetByIdUseCase: FactsheetByIdUseCase,
    private getContractNotesUseCase: GetContractNotesUseCase,
    private contractnoteByIdUseCase: ContractNoteByIdUseCase,
    private getDividendNoticeUseCase: GetDividendNoticeUseCase,
    private getDividendNoticeByIdUseCase: DividendNoticeByIdUseCase,
    private downloadUseCase: DownloadUseCase,
  ) { }

  loadStatements(filter: { sort?: string, search?: any } = {}): void {
    console.log(filter);
    this.getStatementsUseCase.execute(filter).subscribe(statements => {
      this.statementsSubject.next(statements)
    })
  }
  
  loadFactsheets(filter: { sort?: string, search?: any } = {}): void {
    this.getFactsheetsUseCase.execute(filter).subscribe(factsheets => {
      this.factsheetsSubject.next(factsheets)
    })
  }

  getFactsheetById(id: string): Document {
    return this.factsheetByIdUseCase.execute(id)
  }

  loadContractNotes(filter: { sort?: string, search?: any } = {}): void {
    this.getContractNotesUseCase.execute(filter).subscribe(contractNotes => {
      this.contractNotesSubject.next(contractNotes)
    })
  }

  getContractNoteById(id: string): Document {
    return this.contractnoteByIdUseCase.execute(id)
  }

  loadDividendNotice(filter: { sort?: string, search?: any } = {}): void {
    this.getDividendNoticeUseCase.execute(filter).subscribe(dividendNotice => {
      this.dividendNoticeSubject.next(dividendNotice)
    })
  }

  getDividendNoticeById(id: string): Document {
    return this.getDividendNoticeByIdUseCase.execute(id)
  }

  download(id: number): Observable<any> {
    return this.downloadUseCase.execute(id);
  }
}