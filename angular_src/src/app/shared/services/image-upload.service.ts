import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Image } from 'src/models/Image.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'


    })
};
@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    formData: FormData = new FormData;

    constructor(private http: HttpClient) {
    }

    uploadCookProfileImage(file: File, userName: string) {

        this.formData.append('profileImage', file);

        return this.http.post('http://localhost:9090/api/cook/upload/' + userName, this.formData).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );

    }
    uploadRecipeImage(file: File, userName: string) {
        this.formData.append('sampleRecipeImages', file);
        return this.http.post('http://localhost:9090/api/cook/uploadRecipe/' + userName, this.formData).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError));
    }

    getCookProfileImage(userName: string): Observable<any> {
        return this.http.get("http://localhost:9090/api/cook/getCookImage/" + userName);
    }

    deleteCookRecipeImages(userName: string, imageId: number): Observable<Image> {

        return this.http.delete<Image>("http://localhost:9090/api/cook/deleteRecipeImage/" + userName + "/" + imageId).pipe(tap(res => console.log(res)));

    }

    updateCookProfileImage(file: File, userName: string) {
        this.formData.append('profileImage', file);
        return this.http.put('http://localhost:9090/api/cook/updateProfileImage/' + userName, this.formData).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError));
    }

    /*-------------------------user Image service---------------------
     ------------------------------------------------------------------
     -----------------------------------------------------------------*/
    getUserProfileImage(userName: string): Observable<any> {
        return this.http.get("http://localhost:9090/api/user/getUserImage/" + userName);
    }
    uploadUserProfileImage(file: File, userName: string) {
        this.formData.append('profileImage', file);
        return this.http.post('http://localhost:9090/api/user/upload/' + userName, this.formData).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError));
    }
    updateUserProfileImage(file: File, userName: string) {
        this.formData.append('profileImage', file);
        return this.http.put('http://localhost:9090/api/user/updateUserProfileImage/' + userName, this.formData).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError));
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