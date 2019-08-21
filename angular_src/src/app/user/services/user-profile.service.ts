import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/models/user.model';
import { stringify } from '@angular/core/src/render3/util';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ReviewModel } from 'src/models/review.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }




  userProfileUrl: string = "http://localhost:9090/api/users/";

  getUserDetails(userName: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.userProfileUrl + userName).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
    );
  }

  updateUserDetails(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>("http://localhost:9090/api/users/update", JSON.stringify(user)).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
    );
  }
  getCookOfUser(userName: string): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:9090/api/cookUser/getCookOfUser/" + userName).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
    );
  }


  setCookrating(userName: string, cookUserName: string, rating: number) {
    return this.http.put("http://localhost:9090/api/cookUser/setCookRating/" + userName + "/" + cookUserName, rating).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
    );
  }

  deleteAccount(userName: string) {
    return this.http.delete("http://localhost:9090/api/users/delete/" + userName);
  }
  giveReview(cookUserName: string, userName: string, review: ReviewModel): Observable<any> {
    return this.http.post<string>("http://localhost:9090/api/review/giveReview/" + cookUserName + "/" + userName, JSON.stringify(review), httpOptions)
  }

  getUserReview(cookUserName: string, userName: string) {
    return this.http.get<ReviewModel>("http://localhost:9090/api/review/getUserReview/" + cookUserName + "/" + userName).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
    );
  }

  updateUserReview(cookUserName: string, userName: string, review: ReviewModel): Observable<any> {
    return this.http.put<ReviewModel>("http://localhost:9090/api/review/updateReview/" + cookUserName + "/" + userName, review, httpOptions).pipe(
      tap(data => JSON.stringify(data),
        catchError(this.handleError))
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
