import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { IProfileRepository } from "../../repositories/profile.repository";

@Injectable({
  providedIn: 'root',
})
export class UploadAvatarUseCase {
  constructor(private profileRepository: IProfileRepository) { }

  execute(userId: string, file: any): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('User id is required'));
    }

    if(!file) {
      return throwError(() => new Error('File is required'));
    }

    return this.profileRepository.uploadAvatar(userId, file);
  }
}