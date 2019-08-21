import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookModel } from 'src/models/cook.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from 'src/models/user.model';

//import {Http, Request, Response} from '@angular/http';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};


@Injectable(
    {
        providedIn: 'root'

    }
)
export class RegistrationService {


    // registrationUrl: string = 'http://localhost:8080/cooks/create';

    constructor(private http: HttpClient) {

    }

    registerCook(_cook: CookModel): Observable<CookModel> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        //console.log(_cook);
        console.log(JSON.stringify(_cook));
        return this.http.post<CookModel>('http://localhost:9090/api/cooks/create/', JSON.stringify(_cook), httpOptions).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );



    }
    registerUser(user: UserModel): Observable<UserModel> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        //console.log(_cook);
        console.log(JSON.stringify(user));
        return this.http.post<UserModel>('http://localhost:9090/api/users/create', JSON.stringify(user), httpOptions).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    registerCookToUser(userName: string, cookUserName: string): Observable<any> {
        return this.http.get("http://localhost:9090/api/cookUser/registerCookToUser/" + userName + "/" + cookUserName).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );;

    }


    deRegisterUser(userName: string, cookUserName: string): Observable<any> {

        return this.http.get("http://localhost:9090/api/cookUser/deRegisterCookToUser/" + userName + "/" + cookUserName).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    sendHiredRegistrationMessage(userName: string, cookUserName: string): Observable<any> {
        return this.http.get("http://localhost:9090/api/cookUser/sendHiredRegistrationMessage/" + userName + "/" + cookUserName).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    /*  sendUserRegistrationMessage(userName:string):Observable<any> {
         return this.http.get("http://localhost:8080/cookUser/sendUserRegistrationMessage/"+userName).pipe(
             tap(data => JSON.stringify(data)),
             catchError(this.handleError)
         );
     }
 
     sendCookRegistrationMessage(cookUserName:string):Observable<any> { 
         return this.http.get("http://localhost:8080/cookUser/sendCookRegistrationMessage/"+cookUserName).pipe(
             tap(data => JSON.stringify(data)),
             catchError(this.handleError)
         );
     } */


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



