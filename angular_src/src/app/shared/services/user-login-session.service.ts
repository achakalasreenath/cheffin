import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { CookModel } from 'src/models/cook.model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginSessionService {
  _user: Subject<UserModel> = new BehaviorSubject<UserModel>(new UserModel("", "", "", "", "", 0, undefined, [], [], ''));
  get user$() {
    return this._user.asObservable();
  }

  addUser(user: UserModel) {
    this._user.next(user);
  }



}