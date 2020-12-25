import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseAuthGuard } from './base-auth.guard';
import { RoleEnum } from '@enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserGuard extends BaseAuthGuard {

  protected checkAuthFail(): Observable<boolean> {
    this.router.navigate([ '/login' ]);
    return of(false);
  }

  protected checkSuccessResponse(): Observable<boolean> | boolean {
    return this.checkRoleOrNavigate([RoleEnum.User]);
  }

}
