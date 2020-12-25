import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VerifyCodeReqModel} from '@api/auth/req/verify-code-req.model';
import {AuthService} from '@api/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Unsubscribe} from '@decorators/unsubscribe.decorator';
import {BaseComponent} from '@helpers/base.component';
import {RegisterTypeEnum} from '@enums/register-type.enum';
import {Location} from '@angular/common';
import {SendEmailReqModel} from '@api/auth/req/send-email-req.model';
import { finalize } from 'rxjs/operators';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('code2') code2: ElementRef<HTMLInputElement>;
  @ViewChild('code3') code3: ElementRef<HTMLInputElement>;
  @ViewChild('code4') code4: ElementRef<HTMLInputElement>;

  verificationReqData = new VerifyCodeReqModel();
  emailReqData = new SendEmailReqModel();
  registerParams = null;
  buttonLoading: boolean = false;
  resendTimeout = 59;
  resend = true;
  private timing;
  RegisterTypeEnum = RegisterTypeEnum;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerParams = this.activatedRoute.snapshot.queryParams;

    if (!this.registerParams.registerType || !this.registerParams.data) {
      this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
    }
    this.setResendTimeout(true);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.stopInterval();
  }

  private stopInterval() {
    if (this.timing) {
      clearInterval(this.timing);
    }
    this.resendTimeout = 59;
  }

  setResendTimeout(isFirst = false): void {
    this.verificationReqData.clearCode();
    if (!isFirst) {
      if (this.registerParams.forgotPassword) {
        this.sendCodeForForgotPassword();
      } else {
        this.sendVerificationCode();
      }
    }

    this.stopInterval();
    this.resend = false;
    this.timing = setInterval(() => {
      this.resendTimeout -= 1;
      if (this.resendTimeout === 0) {
        this.resend = true;
        this.stopInterval();
      }
    }, 1000);
  }

  goBack(): void {
    this.location.back();
  }

  oneDigit(e, index: number): void {
    if (index === 3) {
      this.verifyCode();
    }

    if (e.target.value.length === 2) {
      e.target.value = e.target.value.substring(1);
    }

    let element: ElementRef<HTMLInputElement> = null;
    switch (index) {
      case 0:
        element = this.code2;
        break;
      case 1:
        element = this.code3;
        break;
      case 2:
        element = this.code4;
        break;
      default:
        break;
    }
    if (element) {
      element.nativeElement.focus();
    }
  }

  @Unsubscribe()
  verifyCode() {
    this.verificationReqData.email = this.registerParams.data;
    const redirectTo = this.registerParams.forgotPassword ? '../create-forgot-password' : '../create-password';

    if (this.verificationReqData.validate()) {
      this.buttonLoading = true;
      return this.authService.verifyCode(this.verificationReqData)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(() => {
        this.router.navigate([redirectTo], {
          relativeTo: this.activatedRoute,
          queryParams: {
            registerType : this.registerParams.registerType,
            data         : this.registerParams.data,
            userType     : this.registerParams.userType,
            code         : `${this.verificationReqData.code1}${this.verificationReqData.code2}${this.verificationReqData.code3}${this.verificationReqData.code4}`,
          },
        });
      });
    } else {
      this.toasterService.showNotification('Please enter verification code', ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  private sendVerificationCode() {
    this.emailReqData.registerType = this.registerParams.registerType;
    this.emailReqData.email = this.registerParams.data;
    // if (this.emailReqData.validate()) {
      this.buttonLoading = true;
      return this.authService.sendCodeForSignUp(this.emailReqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {
          this.router.navigate(['../verify'], {
            relativeTo: this.activatedRoute,
            queryParams: {
              registerType : this.registerParams.registerType,
              data         : this.emailReqData.email,
              userType     : this.registerParams.userType,
            },
          });
        });
    // }
  }

  @Unsubscribe()
  sendCodeForForgotPassword() {
    if (this.emailReqData.validate()) {
      this.buttonLoading = true;
      return this.authService.sendCodeForForgotPassword(this.emailReqData)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(() => {
        this.router.navigate(['../verify'], {
          relativeTo: this.activatedRoute,
          queryParams: {
            registerType   : this.emailReqData.registerType,
            data           : this.emailReqData.phoneNumber || this.emailReqData.email,
            forgotPassword : true,
          },
        });
      });
    }
  }
}
