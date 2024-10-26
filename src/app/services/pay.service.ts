import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environment';
import { catchError, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  public error$: Subject<string> = new Subject<string>()
  isAuthorized = false;

  constructor(
    private http: HttpClient
  ) {
  }

  auth(user: any) {
    return this.http.post('https://fakestoreapi.com/auth/login', { username: "mor_2314", password: "83r5^_" })

      .pipe(

        // return this.http.post(`${environments.url}`, user).pipe(
        tap(this.Authorized),
        catchError(this.handleError.bind(this))
      );



  };

  Authorized(response: any) {
    console.log('response', response)
    if (response) {
      this.isAuthorized = true;
    }
  }

  pay() {

  };

  reject() {

  };

  private handleError(error: HttpErrorResponse) {
    // console.error('An error occurred:', error['message']);
    switch (error.status) {
      case 0:
        this.error$.next(error['message'])
        break
      case 401:
        this.error$.next("Error: Username or password is incorrect")
        break
      case 500:
        this.error$.next('Error: Another error')
        break

    }


    return throwError(error)
  }

}
