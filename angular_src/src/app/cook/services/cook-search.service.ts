import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookModel } from 'src/models/cook.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReviewModel } from 'src/models/review.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};
@Injectable({
    providedIn: 'root'
})
export class CookSearchService {

    constructor(private http: HttpClient) {

    }
    searchByNameUrl: string = "http://localhost:9090/api/cooks";


    searchByName(): Observable<CookModel[]> {
        return this.http.get<CookModel[]>(this.searchByNameUrl).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    searchByLocation(locationEntered: string): Observable<CookModel[]> {
        return this.http.get<CookModel[]>("http://localhost:9090/api/search/searchByLocation/" + locationEntered).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    searchByPrice(price: Number): Observable<CookModel[]> {
        return this.http.get<CookModel[]>("http://localhost:9090/api/search/searchByPrice/" + price).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    searchByPriceAndLocation(price: Number, location: string): Observable<CookModel[]> {
        return this.http.get<CookModel[]>("http://localhost:9090/api/search/searchByPriceAndLocation/" + price + "/" + location).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }
    getCookByCookUserName(userName: string): Observable<CookModel> {
        return this.http.get<CookModel>("http://localhost:9090/api/cooks/getCookByUserName/" + userName).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    updateCookDetails(cook: CookModel): Observable<CookModel> {
        return this.http.put<CookModel>("http://localhost:9090/api/cooks/update", JSON.stringify(cook), httpOptions);
    }

    deleteAccount(userName: string) {
        return this.http.delete("http://localhost:9090/api/cooks/delete/" + userName);
    }

    getReviews(cookUserName: string) {
        return this.http.get<ReviewModel[]>("http://localhost:9090/api/review/getCookReviews/" + cookUserName)
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



