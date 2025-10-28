import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DocumentApiService } from "../../../infrastructure/api/document.api.service";
import { Document } from "../../entities/document.entity";

@Injectable({
  providedIn: 'root'
})
export class GetContractNotesUseCase {
    constructor(private documentRepository: DocumentApiService) { }

    execute(filter: { sort?: string, search?: any }): Observable<Document[]> {
      return this.documentRepository.getContractNotes(filter);
    }
}