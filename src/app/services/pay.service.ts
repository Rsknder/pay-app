import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environment';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { Payment } from '../interfaces/interface';

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

  auth(user: string) {
   return this.http.post(`${environments.url}`, {user}).pipe(
        catchError(this.handleError.bind(this))
      );
  };

  pay(payment: Payment) {
if (!this.validatePayment(payment,'Pay'))
  { this.error$.next('invalid validation on pay service!')
   return this.error$
  }
  return this.http.post(`${environments.url}`, payment).pipe(
   catchError(this.handleError.bind(this))
    );
  };

  reject(payment: Payment) {

    if (!this.validatePayment(payment,'Reject'))
      { this.error$.next('invalid validation on reject service!')
       return this.error$
      }
     return this.http.post(`${environments.url}`, payment).pipe(
      catchError(this.handleError.bind(this))
    );
  };

  private validatePayment (payment: Payment, type: any) {
    if (  
      payment.cardHolder.length < 1 ||
      payment.cardNumber.length < 16 ||
      payment.validity.length < 5 ||
      !payment.cvv ||
      payment.operation !==type ||
      (type === "Reject" && !payment.receiptNumber) 
    ) { return false;}
    return true;  }

  private handleError(error: HttpErrorResponse) {
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
