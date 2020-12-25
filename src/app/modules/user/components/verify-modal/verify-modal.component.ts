import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@platform/api/auth/auth.service';
import { ChangeEmailReqModel } from '@platform/api/user/req/change-email-req.model';
import { SendEmailVerifyReqModel } from '@platform/api/user/req/send-email-req.model';
import { UserService } from '@platform/api/user/user.service';
import { Unsubscribe } from '@platform/decorators/unsubscribe.decorator';
import { BaseComponent } from '@platform/helpers/base.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.scss'],
})
export class VerifyModalComponent extends BaseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<string>();
  @ViewChild('code2') code2: ElementRef<HTMLInputElement>;
  @ViewChild('code3') code3: ElementRef<HTMLInputElement>;
  @ViewChild('code4') code4: ElementRef<HTMLInputElement>;
  @Input() email: string = '';
  verificationEmailReqData = new ChangeEmailReqModel();
  emailReqData = new SendEmailVerifyReqModel();
  buttonLoading: boolean = false;
  resendTimeout = 59;
  resend = true;
  private timing;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setResendTimeout();
  }

  private stopInterval() {
    if (this.timing) {
      clearInterval(this.timing);
    }
    this.resendTimeout = 59;
  }

  setResendTimeout(): void {
    this.sendCodeForVerifyEmail();

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

  oneDigit(e, index: number): void {
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
      case 3:
        this.changeEmail();
        break;
      default:
        break;
    }
    
    if (element) {
      element.nativeElement.focus();
    }
  }

  @Unsubscribe()
  private sendCodeForVerifyEmail() {
    this.emailReqData.email = this.email;
      this.buttonLoading = true;
      return this.userService.sendCodeForVerifyEmail(this.emailReqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {

        });
  }

  @Unsubscribe()
  changeEmail() {
    this.verificationEmailReqData.email = this.email;
    if (this.verificationEmailReqData.validate()) {
      this.buttonLoading = true;
      return this.userService.changeEmail(this.verificationEmailReqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {
          this.update.emit(this.verificationEmailReqData.email);
        });
    }
  }

}
