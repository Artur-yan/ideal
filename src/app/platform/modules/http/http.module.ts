import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { TransformerInterceptor } from './interceptors/transformer.interceptor';
import { HttpService } from './services/http.service';
import { HttpOptionsService } from './services/http-options.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
})
export class HttpModule {
  static forRoot() {
    return {
      ngModule: HttpModule,
      providers: [
        HttpService,
        HttpOptionsService,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TransformerInterceptor, multi: true },
      ],
    };
  }
}
