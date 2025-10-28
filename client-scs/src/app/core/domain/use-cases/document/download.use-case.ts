import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DocumentApiService } from "../../../infrastructure/api/document.api.service";
import { DocumentRepository } from "../../repositories/document.repository";

@Injectable({
  providedIn: 'root'
})
export class DownloadUseCase {
  constructor(private documentRepository: DocumentRepository) { }

  execute(id: number): Observable<any> {
    return this.documentRepository.download(id);
  }
}