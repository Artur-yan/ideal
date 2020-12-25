import { AppHelper } from '@platform/helpers';
import { RoleEnum } from '@enums/role.enum';

export class Config {
  public baseRoute: string;
  public role: RoleEnum;

  constructor(role: RoleEnum) {
    this.role = role;
    this.baseRoute = '/' + AppHelper.GET_BASE_ROUTE(this.role);
  }
}
