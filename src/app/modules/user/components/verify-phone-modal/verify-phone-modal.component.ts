import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ChangePhoneReqModel } from '@platform/api/user/req/change-phone-req.model';
import { SendPhoneVerifyReqModel } from '@platform/api/user/req/send-phone-req.model';
import { UserService } from '@platform/api/user/user.service';
import { Unsubscribe } from '@platform/decorators/unsubscribe.decorator';
import { BaseComponent } from '@platform/helpers/base.component';

@Component({
  selector: 'app-verify-phone-modal',
  templateUrl: './verify-phone-modal.component.html',
  styleUrls: ['./verify-phone-modal.component.scss'],
})
export class VerifyPhoneModalComponent extends BaseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<string>();
  @ViewChild('code2') code2: ElementRef<HTMLInputElement>;
  @ViewChild('code3') code3: ElementRef<HTMLInputElement>;
  @ViewChild('code4') code4: ElementRef<HTMLInputElement>;
  @Input() phoneNumber: string = '';
  verifyReqData = new ChangePhoneReqModel();
  reqData = new SendPhoneVerifyReqModel();
  buttonLoading: boolean = false;
  resendTimeout = 59;
  resend = true;
  private timing;
  
  constructor(
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
    this.sendVerifyCode();

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
        this.verify();
        break;
      default:
        break;
    }
    
    if (element) {
      element.nativeElement.focus();
    }
  }

  @Unsubscribe()
  private sendVerifyCode() {
    this.reqData.phoneNumber = this.phoneNumber;
      this.buttonLoading = true;
      return this.userService.sendCodeForVerifyPhone(this.reqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {

        });
  }

  @Unsubscribe()
  verify() {
    this.verifyReqData.phoneNumber = this.phoneNumber;
    if (this.verifyReqData.validate()) {
      this.buttonLoading = true;
      return this.userService.changePhoneNumber(this.verifyReqData)
        .pipe(finalize(() => this.buttonLoading = false))
        .subscribe(() => {
          this.update.emit(this.verifyReqData.phoneNumber);
        });
    }
  }

}
