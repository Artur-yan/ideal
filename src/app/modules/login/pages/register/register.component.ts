import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@helpers/base.component';
import {AuthService} from '@api/auth/auth.service';
import {Unsubscribe} from '@decorators/unsubscribe.decorator';
import {RegisterRM} from '@api/auth/req/register-req.model';
import {SendEmailReqModel} from '@api/auth/req/send-email-req.model';
import {DropdownModel} from '@models/select';
import {UserTypeEnum} from '@enums/user-type.enum';
import {CountryCodeEnum} from '@enums/country-code.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterTypeEnum} from '@enums/register-type.enum';
import { finalize } from 'rxjs/operators';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {

  reqData = new SendEmailReqModel();
  buttonLoading: boolean = false;
  RegisterTypeEnum = RegisterTypeEnum;
  userType: UserTypeEnum = UserTypeEnum.Physical;

  userTypeList: DropdownModel<UserTypeEnum>[] = [
    new DropdownModel('Physical person', UserTypeEnum.Physical),
    new DropdownModel('Juridical person', UserTypeEnum.Juridical),
  ];

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
    if (this.reqData.errors.email) {
      message += `You have entered an invalid email address. Please try again. \n`;
    }
    if (this.reqData.errors.phoneNumber) {
      message += `Phone number length must be 8 symbols. \n`;
    }
    if (message) {
      this.toasterService.showNotification(message, ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  sendVerificationCode() {
    if (this.reqData.validate()) {
      this.buttonLoading = true;
      return this.authService.sendCodeForSignUp(this.reqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {
          this.router.navigate(['../verify'], {
            relativeTo: this.activatedRoute,
            queryParams: {
              registerType : this.reqData.registerType,
              data         : this.reqData.phoneNumber ? (this.reqData.phoneCode + this.reqData.phoneNumber) :  this.reqData.email,
              userType     : this.userType,
            },
          });
        });
    } else {
      this.showErrors();
    }
  }
}
