import { Injectable } from '@angular/core';
import { ApiService } from '@platform/modules/http/classes/base.service';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { PhotoReqModel } from '@api/user/req/photo-req.model';
import { ChangePasswordRM } from '@api/auth/req/change-password';
import { ChangePhysicalUserInfoRM } from '@platform/api/auth/req/change-physical-user.model';
import { ChangeJuridicalPersonalInfoRM } from '@api/auth/req/change-juridical-personal-info-req.model';
import { SendEmailVerifyReqModel } from './req/send-email-req.model';
import { SendPhoneVerifyReqModel } from './req/send-phone-req.model';
import { ChangePhoneReqModel } from './req/change-phone-req.model';
import { ChangeEmailReqModel } from './req/change-email-req.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {

  readonly controller = 'user';

  public getDetails(): Observable<User> {
    return this.httpClient.get('getUserDetails', { model: User });
  }

  public uploadPhoto(data: PhotoReqModel): Observable<any> {
    return this.httpClient.post('uploadImage', { model: null }, data.getModel());
  }

  public deletePhoto(): Observable<any> {
    return this.httpClient.delete('deletePhotoForUser', { model: null });
  }

  public changePassword(data: ChangePasswordRM): Observable<any> {
    return this.httpClient.put('changePassword', { model: null }, data.getModel());
  }

  public changePersonalInfo(data: ChangePhysicalUserInfoRM | ChangeJuridicalPersonalInfoRM) {
    return this.httpClient.put('', { model: null }, data.getModel());
  }

  public sendCodeForVerifyEmail(data: SendEmailVerifyReqModel): Observable<any> {
    return this.httpClient.put('sendCodeForVerifyEmail', { model: null }, data.getModel());
  }

  public sendCodeForVerifyPhone(data: SendPhoneVerifyReqModel): Observable<any> {
    return this.httpClient.put('sendCodeForVerifyPhone', { model: null }, data.getModel());
  }

  public changeEmail(data: ChangeEmailReqModel): Observable<any> {
    return this.httpClient.put('changeEmail', { model: null }, data.getModel());
  }

  public changePhoneNumber(data: ChangePhoneReqModel): Observable<any> {
    return this.httpClient.put('changePhoneNumber', { model: null }, data.getModel());
  }
}
