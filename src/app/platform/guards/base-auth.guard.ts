import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthStorage } from '@storage/auth.storage';
import { AppHelper } from '@platform/helpers';
import { RoleEnum } from '@enums/role.enum';

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {

  constructor(
    protected authStorage: AuthStorage,
    protected router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authStorage.checkLoginState()
      .pipe(
        map(() => {
          if (this.authStorage.getTokenFromStorage()) {
            return this.checkSuccessResponse();
          } else {
            throw new Error();
          }
        }),
        catchError(() => this.checkAuthFail()),
      );
  }

  protected checkRoleOrNavigate(roles: RoleEnum[]) {

    if (roles.includes(this.authStorage.getRoleFromToken())) {
      return true;
    } else {
      this.navigateByRole();
      return false;
    }
  }

  protected navigateByRole() {
    const route = AppHelper.GET_BASE_ROUTE(this.authStorage.getRoleFromToken());
    if (route) {
      this.router.navigate([ route ]);
    } else {
      this.authStorage.logout();
      this.router.navigate([ 'login' ]);
    }
  }

  protected abstract checkAuthFail();

  protected abstract checkSuccessResponse();

}
