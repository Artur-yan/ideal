import { Component, OnInit } from '@angular/core';
import { ChangePasswordRM } from '@api/auth/req/change-password';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from '@helpers/base.component';
import { UserService } from '@api/user/user.service';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent extends BaseComponent implements OnInit  {

  reqData = new ChangePasswordRM();

  passBtnLoading: boolean = false;
  showCurrentPassword = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private userService: UserService,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  setShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  setShowCurrentPassword(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  setShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  private showErrors() {
    let message = '';
    if (this.reqData.errors.oldPassword) {
      message += `Old password length must be greather than or equal 6 symbols. \n`;
    }
    if (this.reqData.errors.password && this.reqData.password.length < 6) {
      message += `Password length must be greather than or equal 6 symbols. \n`;
    }
    if (this.reqData.password !== this.reqData.confirmPassword) {
      message += `Password and confirm password must be equal. \n`;
    }
    if (message) {
      this.toasterService.showNotification(message, ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  changePassword() {
    if (this.reqData.validate()) {
      this.passBtnLoading = true;
      return this.userService.changePassword(this.reqData)
        .pipe(finalize(() => this.passBtnLoading = false))
        .subscribe(() => {
          this.reqData = new ChangePasswordRM();
          this.toasterService.showNotification('Successfuly saved');
        });
    } else {
      this.showErrors();
    }
  }
}
