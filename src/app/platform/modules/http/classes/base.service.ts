import { Injectable } from '@angular/core';

import { HttpClient } from '@platform/modules/http/classes/http-client';
import { HttpService } from '@platform/modules/http/services/http.service';
import { IOptions } from '@platform/modules/http/interfaces';
import { IHttpServiceContract } from '../interfaces/http-service-contract';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService implements IHttpServiceContract {

  protected httpClient: HttpClient;
  public httpOptions: IOptions;
  public abstract controller: string;

	constructor(
    public http: HttpService,
    ) {
    this.httpClient = new HttpClient(this);
  }
}
