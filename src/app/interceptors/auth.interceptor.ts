import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem("accessToken");
    const cloned = token ? request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }): request;

    return next.handle(cloned).pipe(
      catchError(err => {
         Swal.fire({
                title: 'Application Error',
                text: err.Message ?? err.error.message,
                icon: 'error',
                confirmButtonText: 'OK',
              });
        return throwError(() => err);
      })
    );
    return next.handle(request);
  }
}
