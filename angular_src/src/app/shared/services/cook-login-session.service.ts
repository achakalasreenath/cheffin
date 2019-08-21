import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { CookModel } from 'src/models/cook.model';
import { Image } from 'src/models/Image.model';
@Injectable({
  providedIn: 'root'
})
export class CookLoginSessionService {
  _cook: Subject<CookModel> = new BehaviorSubject<CookModel>(new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], ''));
  get cook$() {
    return this._cook.asObservable();
  }

  addCook(cook: CookModel) {
    this._cook.next(cook);
  }
}
