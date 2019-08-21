import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from 'src/models/user.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CookModel } from 'src/models/cook.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserDetailsUrl: string = "http://localhost:9090/api/users/getUserByUserName/"
  getUserService(_userName: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.getUserDetailsUrl + _userName).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
  getCookService(_userName: string): Observable<CookModel> {
    return this.http.get<CookModel>("http://localhost:9090/api/cooks/getCookByUserName/" + _userName).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }



  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.message;
    }
    else {
      errorMessage = 'statues code = :' + err.status + '  ' + 'Error Message : =' + err.message;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }

}



