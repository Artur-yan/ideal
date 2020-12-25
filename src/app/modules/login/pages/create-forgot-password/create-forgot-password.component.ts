import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { RegisterRM } from '@api/auth/req/register-req.model';
import { ResetPasswordReqModel } from '@api/auth/req/reset-password-req.model';
import { AuthService } from '@api/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStorage } from '@storage/auth.storage';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { RegisterTypeEnum } from '@enums/register-type.enum';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-forgot-password',
  templateUrl: './create-forgot-password.component.html',
  styleUrls: ['./create-forgot-password.component.scss'],
})
export class CreateForgotPasswordComponent extends BaseComponent implements OnInit {

  resetReqModel = new ResetPasswordReqModel();
  registerParams = null;
  showPassword = false;
  showConfirmPassword = false;
  buttonLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authStorage: AuthStorage,
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerParams = this.activatedRoute.snapshot.queryParams;
    if (this.registerParams.code) {
      this.resetReqModel.code = this.registerParams.code;
    }
  }

  @Unsubscribe()
  resetPassword() {
    this.resetReqModel.email = this.registerParams.data;
    if (this.resetReqModel.validate()) {
      this.buttonLoading = true;
      return this.authService.resetPassword(this.resetReqModel)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe((res) => {
        this.router.navigateByUrl('/login');
      });
    }
  }
}
