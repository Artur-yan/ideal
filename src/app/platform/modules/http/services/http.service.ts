import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { HttpOptionsService } from './http-options.service';
import { IOptions } from '../interfaces';

@Injectable()
export class HttpService {
    
	constructor(
		private http: HttpClient,
		private httpOptionsService: HttpOptionsService,
	) { }
	
	public get(url: string, options: IOptions, params: any): Observable<any> {
		return this.http.get(this.getFullUrl(url), this.httpOptionsService.getOptions(this.prepareParams(params), options));
	}
	
	public post(url: string, options: IOptions, params: any): Observable<any> {
		return this.http.post(this.getFullUrl(url), params, this.httpOptionsService.getOptions(null, options));
	}
	
	public put(url: string, options: IOptions, params: any): Observable<any> {
		return this.http.put(this.getFullUrl(url), params, this.httpOptionsService.getOptions(null, options));
	}
	
	public delete(url: string, options: IOptions, params: any): Observable<any> {
		return this.http.delete(this.getFullUrl(url), this.httpOptionsService.getOptions(this.prepareParams(params), options));
	}

	private getFullUrl(url: string): string {
		return environment.baseUrl + url;
	}
	
	private prepareParams(params: any): any {
		for (const i in params) {
			if (typeof params[i] === 'boolean' || typeof params[i] === 'number') {
				params[i] = params[i].toString();
			}
		}
		
		return params as any;
	}
}
