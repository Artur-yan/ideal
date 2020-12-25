import { HttpHeaders } from '@angular/common/http';

export interface IHttpOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: any;
  responseType?: 'json';
  withCredentials?: boolean;
}
