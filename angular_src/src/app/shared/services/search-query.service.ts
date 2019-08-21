import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {
  searchQuery: Subject<string> = new BehaviorSubject<string>('');
  get searchQuery$() {
    return this.searchQuery.asObservable();
  }

  addSearchQuery(searchQuery: string) {
    this.searchQuery.next(searchQuery);
  }
}