import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { IHttpOptions } from '@platform/modules/http/interfaces';
import { IOptions } from '../interfaces/options.interface';
import { LanguageEnum } from '@enums/language.enum';

@Injectable()
export class HttpOptionsService {

	private defaultHeaders = {
		Accept : 'application/json',
	};

	private defaultOptions: IHttpOptions = {
		headers: new HttpHeaders(this.defaultHeaders),
		observe: null,
		params: null,
		responseType: 'json',
		withCredentials: null,
	};

	private options: IHttpOptions;
	public dontHandleError: boolean;
	public model: any;
	public pagination: boolean;
	public pagingExtraModel: any;

	public getOptions(params?: any, options: IOptions = {}): IHttpOptions {
		this.options = Object.assign({}, this.defaultOptions);
		this.mergeOptions(options);
		this.options.params = params || {};
		return this.options;
	}

	public setAuth(token: string): void {
		this.setHeader('Authorization', token ? 'Bearer ' + token : '');
	}

	public setLanguage(language: LanguageEnum) {
	  this.setHeader('LanguageId', language.toString());
  }

  public setDeviceId(deviceId: string): void {
    this.setHeader('DeviceId', deviceId);
  }

  public setHeader(name: string, value: string): void {
    this.defaultOptions.headers = this.defaultOptions.headers.set(name, value);
  }

	private mergeOptions(options: IOptions): void {
		for (const i in options) {
			if (this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}

		this.dontHandleError = options.dontHandleError;
		this.model = options.model;
		this.pagination = options.pagination;
		this.pagingExtraModel = options.pagingExtraModel;
	}

	public removeAuth(): void {
		if (this.options) {
			this.options.headers.delete('Authorization');
		}
	}
}
