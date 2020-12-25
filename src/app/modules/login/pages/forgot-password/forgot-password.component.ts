import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@api/auth/auth.service';
import { SendEmailReqModel } from '@api/auth/req/send-email-req.model';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { CountryCodeEnum } from '@enums/country-code.enum';
import { RegisterTypeEnum } from '@enums/register-type.enum';
import { BaseComponent } from '@helpers/base.component';
import { DropdownModel } from '@models/select';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  reqData = new SendEmailReqModel();
  RegisterTypeEnum = RegisterTypeEnum;
  buttonLoading: boolean = false;

  userPhoneNumber: DropdownModel<CountryCodeEnum>[] = [
    new DropdownModel('(+374)', CountryCodeEnum.Arm, '/assets/images/arm.png'),
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.reqData.registerType = +this.activatedRoute.snapshot.queryParams.loginType || this.reqData.registerType;
  }

  changeVerifyType(): void {
    this.reqData.email = null;
    this.reqData.phoneNumber = null;
    this.reqData.registerType = this.reqData.registerType === RegisterTypeEnum.Email ? RegisterTypeEnum.Phone : RegisterTypeEnum.Email;
  }

  private showErrors() {
    let message = '';
    if (this.reqData.errors.email && !this.reqData.email) {
      message += `Please write email. \n`;
    }
    if (this.reqData.errors.phoneNumber && !this.reqData.phoneNumber) {
      message += `Please write phone number. \n`;
    }
    if (message) {
      this.toasterService.showNotification(message, ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  sendCodeForForgotPassword() {
    if (this.reqData.validate()) {
      this.buttonLoading = true;
      return this.authService.sendCodeForForgotPassword(this.reqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {
          this.router.navigate(['../verify'], {
            relativeTo: this.activatedRoute,
            queryParams: {
              registerType   : this.reqData.registerType,
              data           : this.reqData.phoneNumber ? (this.reqData.phoneCode + this.reqData.phoneNumber) : this.reqData.email,
              forgotPassword : true,
            },
          });
        });
    } else {
      this.showErrors();
    }
  }
}
