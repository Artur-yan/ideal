import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HandledError } from '../classes/handled-error';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { HttpOptionsService } from '../services/http-options.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';
import { Toaster } from '@platform/modules/toaster/models/toaster.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    protected httpOptionsService: HttpOptionsService,
    protected toasterService: ToasterService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HandledError>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          const res = new HandledError(err && err.message);
          switch (err.status) {
            case 401:
              localStorage.clear();
              location.reload();
              break;
            case 403:
              res.text = 'Sorry, but you dont have permission';
              break;
          }

          if (!this.httpOptionsService.dontHandleError) {
            this.toasterService.toaster.next(new Toaster({
              status: ToasterEnum.Error,
              text: res.text,
            }));
          }

          return throwError(res);
        }),
      );

  }
}
