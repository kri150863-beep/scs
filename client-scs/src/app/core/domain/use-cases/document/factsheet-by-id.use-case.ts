import { Injectable } from "@angular/core";
import { DocumentApiService } from "../../../infrastructure/api/document.api.service";
import { Document } from "../../entities/document.entity";

@Injectable({
  providedIn: 'root'
})
export class FactsheetByIdUseCase {
    constructor(private documentRepository: DocumentApiService) { }

    execute(id: string): Document {
        return this.documentRepository.getFactsheetById(id)
    }
}