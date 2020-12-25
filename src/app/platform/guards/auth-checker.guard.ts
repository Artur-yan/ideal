import { Injectable } from '@angular/core';
import { BaseAuthGuard } from '@guards/base-auth.guard';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthCheckerGuard extends BaseAuthGuard {

  protected checkAuthFail() {
    return of(true);
  }

  protected checkSuccessResponse() {
    return true;
  }

}
