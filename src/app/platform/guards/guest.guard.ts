import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BaseAuthGuard} from './base-auth.guard';
import {RoleEnum} from '@enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard extends BaseAuthGuard {

  protected checkAuthFail(): Observable<boolean> {
    return of(false);
  }

  protected checkSuccessResponse(): boolean {
    return this.checkRoleOrNavigate([RoleEnum.Guest]);
  }
}
