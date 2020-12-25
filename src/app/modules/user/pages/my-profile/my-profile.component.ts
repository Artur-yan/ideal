import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { UserService } from '@api/user/user.service';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { ChangePhysicalUserInfoRM } from '@platform/api/auth/req/change-physical-user.model';
import { finalize } from 'rxjs/operators';
import { DropdownModel } from '@models/select';
import { CountryCodeEnum } from '@enums/country-code.enum';
import { GenderEnum } from '@enums/gender';
import { AuthStorage } from '@storage/auth.storage';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { Validations } from '@platform/validation/validations';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent extends BaseComponent implements OnInit {

  reqData = new ChangePhysicalUserInfoRM();
  user = this.authStorage.getUser();
  email: string = '';
  phoneNumber: string = '';

  perInfoBtnLoading: boolean = false;
  maxDate = new Date();
  verifyIsOpen: boolean = false;
  verifyPhoneIsOpen: boolean;
  userPhoneNumber: DropdownModel<CountryCodeEnum>[] = [
    new DropdownModel('(+374)', CountryCodeEnum.Arm, '/assets/images/arm.png'),
  ];

  gender: DropdownModel<GenderEnum>[] = [
    new DropdownModel('Male', GenderEnum.Male),
    new DropdownModel('Female', GenderEnum.Female),
  ];

  constructor(
    private userService: UserService,
    private authStorage: AuthStorage,
    private toasterService: ToasterService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
    this.reqData.firstName = this.user.physicalUser.firstName;
    this.reqData.lastName = this.user.physicalUser.lastName;
    this.reqData.secondPhoneNumber = this.user.secondPhoneNumber.replace('+374', '');
    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber.replace('+374', '');
    this.reqData.dateOfBirth = this.user.physicalUser.dateOfBirth ? new Date(this.user.physicalUser.dateOfBirth) : null;
    this.reqData.gender = this.user.physicalUser.genderValue;
  }

  openVerify() {
    this.verifyIsOpen = true;
  }

  closeVerify() {
    this.verifyIsOpen = false;
  }

  openVerifyPhone() {
    this.verifyPhoneIsOpen = true;
  }

  closeVerifyPhone() {
    this.verifyPhoneIsOpen = false;
  }

  validateEmail() {
    return Validations.isEmail(this.email);
  }

  validatePhone() {
    return (this.phoneNumber || '').toString().length === 8;
  }

  updateEmail(data: string) {
    this.closeVerify();
    this.user.email = data;
    this.email = data;
  }

  updatePhone(data: string) {
    this.closeVerifyPhone();
    this.user.phoneNumber = data;
    this.phoneNumber = data.replace('+374', '');
  }

  @Unsubscribe()
  changePersonalInfo() {
    this.reqData.secondPhoneNumber = this.reqData.secondPhoneNumber.toString();
    if (this.reqData.validate()) {
      this.perInfoBtnLoading = true;
      return this.userService.changePersonalInfo(this.reqData)
        .pipe(finalize(() => this.perInfoBtnLoading = false))
        .subscribe(() => {
          this.toasterService.showNotification('Successfuly saved');
          this.user.physicalUser.firstName = this.reqData.firstName;
          this.user.physicalUser.lastName = this.reqData.lastName;
          this.email = this.user.email;
          this.phoneNumber = this.user.phoneNumber.replace('+374', '');
        });
    }
  }
}
