import { Injectable } from '@angular/core';
import { ApiService } from '@platform/modules/http/classes/base.service';
import { Observable } from 'rxjs';

import { LoginRM } from './req/login';
import { TokenModel } from './res/token.model';
import { RegisterRM } from './req/register-req.model';
import { ResetPasswordReqModel } from '@api/auth/req/reset-password-req.model';
import { SendEmailReqModel } from '@api/auth/req/send-email-req.model';
import { VerifyCodeReqModel } from '@api/auth/req/verify-code-req.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  readonly controller = 'auth';

  public login(data: LoginRM): Observable<TokenModel> {
    return this.httpClient.post('signIn', { model: TokenModel }, data.getModel());
  }

  public register(data: RegisterRM): Observable<any> {
    return this.httpClient.post('signUp', { model: null }, data.getModel());
  }

  public sendCodeForForgotPassword(data: SendEmailReqModel): Observable<any> {
    return this.httpClient.put('sendCodeForForgotPassword', { model: null }, data.getModel());
  }

  public sendCodeForSignUp(data: SendEmailReqModel): Observable<any> {
    return this.httpClient.put('sendCodeForSignUp', { model: null }, data.getModel());
  }

  public verifyCode(data: VerifyCodeReqModel): Observable<any> {
    return this.httpClient.put('verifyCode', { model: null }, data.getModel());
  }

  public resetPassword(data: ResetPasswordReqModel): Observable<any> {
    return this.httpClient.put('resetPassword', { model: null }, data.getModel());
  }

  public signUpAsGuest(): Observable<TokenModel> {
    return this.httpClient.post('signUpAsGuest', { model: TokenModel });
  }

}
