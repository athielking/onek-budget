import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';


@Injectable()
export class CredentialInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Set bearer token here
    //   request = request.clone({
    //     withCredentials : true
    //   });

      return next.handle(request).pipe(
        tap(
          (event: HttpEvent<any>) => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                this.router.navigate(['/user/login']);
              }
            }
          })
        );
    }
}
