import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

// Env
import { environment } from '@env/environment';

// Libs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let footballAPI = environment.footballAPI;

    // footballAPI
    if (request.url.includes(footballAPI.apiHost)) {
      request = request.clone({
        headers: request.headers
          .set('x-rapidapi-key', footballAPI.apiKey)
          .set('x-rapidapi-host', footballAPI.apiHost)
      });
    }

    return next.handle(request).pipe(
      catchError(err => {

        // footballAPI
        if (request.url.includes(footballAPI.apiHost)) {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/']);
          }
        }

        const error = err.error.message || err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
