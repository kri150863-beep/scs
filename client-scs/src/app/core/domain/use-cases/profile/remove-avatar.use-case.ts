import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { IProfileRepository } from "../../repositories/profile.repository";

@Injectable({
  providedIn: 'root',
})
export class RemoveAvatarUseCase {
  constructor(private profileRepository: IProfileRepository) { }

  execute(userId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('User id is required'));
    }

    return this.profileRepository.removeAvatar(userId);
  }
}