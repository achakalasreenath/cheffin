import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoginSessionService {
  isUser: Subject<string> = new BehaviorSubject<string>('');
  get isUser$() {
    return this.isUser.asObservable();
  }

  addIsUser(isUser: string) {
    this.isUser.next(isUser);
  }
}
