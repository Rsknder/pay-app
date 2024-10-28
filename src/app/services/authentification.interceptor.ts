import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PayService } from './pay.service';
import { environments } from '../environments/environment';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor( private payService: PayService    
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            req = req.clone({
            setParams: {
                Authorization: environments.token,
            }
        })
    return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.log("Error from Interceptor: ", error)
                return throwError(error)
            })
        )
}
};


