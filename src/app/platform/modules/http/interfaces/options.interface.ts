import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseModel } from '../classes/base.model';

export interface IOptions {
  headers?: HttpHeaders;
  observe?: string;
  params?: HttpParams | any;
  responseType?: 'json' | 'blob';
  withCredentials?: boolean;
  dontHandleError?: boolean;
  model?: typeof BaseModel;
  pagingExtraModel?: typeof BaseModel;
  pagination?: boolean;
}
