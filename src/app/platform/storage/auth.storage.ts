import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {catchError, tap, switchMap, map, mergeMap} from 'rxjs/operators';
import { HttpOptionsService } from '../modules/http/services/http-options.service';

import { User } from '@models/user';
import { AuthService } from '@api/auth/auth.service';
import { TokenModel } from '@platform/api/auth/res/token.model';
import { LoginRM } from '@platform/api/auth/req/login';
import { AppHelper } from '@helpers/index';
import { UserService } from '@api/user/user.service';
import { LanguageStorage } from '@storage/language.storage';
import { OsTypeEnum } from '@enums/os-type.enum';
import {RoleEnum} from '@enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {

  private user: User;
  private readonly storageTokenKey: string = 'auth-token';
  private readonly storageDeviceIdKey: string = 'deviceId';
  private loggedInState = new BehaviorSubject<boolean>(undefined);

  constructor(
    private httpOptionsService: HttpOptionsService,
    private authService: AuthService,
    private userService: UserService,
    private languageStorage: LanguageStorage,
  ) {
    this.setAuth(this.getTokenFromStorage());
    this.setDeviceID();
    this.setHeaders();
  }

  public login(data: LoginRM): Observable<User> {
    return this.authService.login(data)
    .pipe(
      tap((res: TokenModel) => {
        this.setAuth(res.token);
        this.saveTokenInStorage(res.token);
      }),
      switchMap(() => this.checkUser()),
    );
  }

  public checkUser(): Observable<User> {
    if (this.getTokenFromStorage()) {
      if (this.getRoleFromToken() === RoleEnum.Guest) {
        const user = User.createNullObject<User>();
        user.type = RoleEnum.Guest;
        this.setUser(user);
        return of(user);
      } else {
        return this.userService.getDetails()
        .pipe(
          tap((user) => this.setUser(user)),
          catchError(_ => {
            this.removeAuth();
            return throwError(false);
          }),
        );
      }
    } else {
      return this.registerGuest()
        .pipe(mergeMap(() => this.checkUser()));
    }
  }

  private setAuth(token: string): void {
    if (token) {
      this.httpOptionsService.setAuth(token);
    }
  }

  public checkLoginState(): Observable<User> {
    if (this.loggedInState.getValue() !== undefined) {
      if (this.loggedInState.getValue()) {
        return of(this.user);
      }

      return throwError(this.user);
    }

    return this.checkUser();
  }

  private setDeviceID(): void {
    const oldDeviceId = this.getDeviceIdFromStorage();
    if (oldDeviceId) {
      this.httpOptionsService.setDeviceId(oldDeviceId);
    } else {
      const deviceId = new Date().getTime() + AppHelper.GENERATE_ID(7);
      this.httpOptionsService.setDeviceId(deviceId);
      this.saveDeviceIdInStorage(deviceId);
    }
  }

  private setUser(user: User): void {
    this.user = user;
    this.loggedInState.next(true);
  }

  public logout(): void {
    this.removeAuth();
    location.reload();
  }

  public saveTokenInStorage(token: string): void {
    localStorage.setItem(this.storageTokenKey, token);
  }

  public getRoleFromToken(): RoleEnum {
    return this.getTokenFromStorage() ? AppHelper.PARSE_TOKEN(this.getTokenFromStorage()).scopes : null;
  }

  public getTokenFromStorage(): string {
    return localStorage.getItem(this.storageTokenKey);
  }

  private removeTokenStorage(): void {
    localStorage.removeItem(this.storageTokenKey);
  }

  private saveDeviceIdInStorage(deviceId: string): void {
    localStorage.setItem(this.storageDeviceIdKey, deviceId);
  }

  private getDeviceIdFromStorage(): string {
    return localStorage.getItem(this.storageDeviceIdKey);
  }

  private removeAuth(): void {
    this.user = null;
    this.removeTokenStorage();
    this.loggedInState.next(false);
    this.httpOptionsService.removeAuth();
  }

  public getUser(): User {
    return this.user;
  }

  private registerGuest(): Observable<TokenModel> {
    return this.authService.signUpAsGuest()
    .pipe(
      tap((res) => {
        this.setAuth(res.token);
        this.saveTokenInStorage(res.token);
      }),
    );
  }

  private setHeaders() {
    this.languageStorage.setLanguageInHeader();
    this.httpOptionsService.setHeader('OsTypeId', OsTypeEnum.Web.toString());
    this.httpOptionsService.setHeader('DeviceToken', '4');
    this.httpOptionsService.setHeader('Model', '4');
    this.httpOptionsService.setHeader('osVersion', '4');
    this.httpOptionsService.setHeader('appVersion', '4');
  }

}
