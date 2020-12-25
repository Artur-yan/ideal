import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@api/auth/auth.service';
import { RegisterRM } from '@api/auth/req/register-req.model';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { RegisterTypeEnum } from '@enums/register-type.enum';
import { BaseComponent } from '@helpers/base.component';
import { AuthStorage } from '@storage/auth.storage';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { ToasterEnum } from '@platform/modules/toaster/enums/toaster-type.enum';
import { USER_BASE_ROUTE } from '@platform/constants/routes';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss'],
})
export class CreatePasswordComponent extends BaseComponent implements OnInit {

  reqData = new RegisterRM();
  showPassword = false;
  showConfirmPassword = false;
  buttonLoading: boolean = false;
  privacyIsOpen: boolean = false;
  termsIsOpen: boolean = false;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private authStorage: AuthStorage,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.reqData.userType = +this.activatedRoute.snapshot.queryParams.userType;
    if (params.registerType == RegisterTypeEnum.Email) {
      this.reqData.phoneCode = '';
      this.reqData.email = params.data;
    }
    if (params.registerType == RegisterTypeEnum.Phone) {
      this.reqData.email = '';
      this.reqData.phoneNumber = params.data;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  openPrivacy() {
    this.privacyIsOpen = true;
  }

  closePrivacy() {
    this.privacyIsOpen = false;
  }

  openTerms() {
    this.termsIsOpen = true;
  }

  closeTerms() {
    this.termsIsOpen = false;
  }

  setPrivacy(): void {
    this.reqData.privacy = !this.reqData.privacy;
  }

  private showErrors() {
    let message = '';
    if (this.reqData.errors.password && this.reqData.password.length < 6) {
      message += `This entry must contain at least 6 characters. \n`;
    }
    if (this.reqData.password !== this.reqData.confirm) {
      message += `Password and confirm password must be equal. \n`;
    }
    if (this.reqData.errors.privacy) {
      message += `Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy. \n`;
    }
    if (message) {
      this.toasterService.showNotification(message, ToasterEnum.Error);
    }
  }

  @Unsubscribe()
  register() {
    if (this.reqData.validate()) {
      this.buttonLoading = true;
      return this.authService.register(this.reqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe((res) => {
          this.authStorage.saveTokenInStorage(res.data.token);
          location.replace(USER_BASE_ROUTE + '/profile');
        });
    } else {
      this.showErrors();
    }
  }
}
