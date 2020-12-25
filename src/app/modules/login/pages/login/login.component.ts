import { Component, OnInit } from '@angular/core';
import { LoginRM } from '@api/auth/req/login';
import { AuthStorage } from '@storage/auth.storage';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from '@helpers/base.component';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { RegisterTypeEnum } from '@enums/register-type.enum';
import { DropdownModel } from '@models/select';
import { CountryCodeEnum } from '@enums/country-code.enum';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {

  reqData = new LoginRM();
  buttonLoading: boolean = false;
  showPassword = false;
  phoneCode: CountryCodeEnum = CountryCodeEnum.Arm;
  RegisterTypeEnum = RegisterTypeEnum;
  userPhoneNumber: DropdownModel<CountryCodeEnum>[] = [
    new DropdownModel('(+374)', CountryCodeEnum.Arm, '/assets/images/arm.png'),
  ];

  constructor(
    private authStorage: AuthStorage,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private showErrors() {
    let message = '';
    if (this.reqData.errors.email && !this.reqData.email) {
      message += `Please enter your email address. \n`;
    }
    if (this.reqData.errors.phoneNumber && !this.reqData.phoneNumber) {
      message += `Please enter your phone number. \n`;
    }
    if (this.reqData.errors.password && !this.reqData.password) {
      message += `Please type your password. \n`;
    }
    if (message) {
      this.toasterService.showNotification(message, ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  submit() {
    if (this.reqData.validate()) {
      this.buttonLoading = true;
      return this.authStorage.login(this.reqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe((user) => {
          location.reload();
        });
    } else {
      this.showErrors();
    }
  }
}
