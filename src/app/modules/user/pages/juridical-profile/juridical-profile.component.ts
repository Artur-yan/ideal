import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { DropdownModel } from '@models/select';
import { CountryCodeEnum } from '@enums/country-code.enum';
import { GenderEnum } from '@enums/gender';
import { UserService } from '@api/user/user.service';
import { AuthStorage } from '@storage/auth.storage';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { finalize } from 'rxjs/operators';
import { ChangeJuridicalPersonalInfoRM } from '@api/auth/req/change-juridical-personal-info-req.model';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';
import { Validations } from '@platform/validation/validations';

@Component({
  selector: 'app-juridical-profile',
  templateUrl: './juridical-profile.component.html',
  styleUrls: ['./juridical-profile.component.scss'],
})
export class JuridicalProfileComponent extends BaseComponent implements OnInit {

  reqData = new ChangeJuridicalPersonalInfoRM();
  user = this.authStorage.getUser();

  perInfoBtnLoading: boolean = false;
  phoneNumber: string = '';
  email: string = '';

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
    const user = this.authStorage.getUser();
    // this.personalReqData.firstName = user.firstName;
    // this.personalReqData.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber.replace('+374', '');
    this.email = user.email;
    this.reqData.accountNumber = this.user.juridicalUser.accountNumber;
    this.reqData.taxNumber = this.user.juridicalUser.taxIdentificationNumber;
    this.reqData.addressName = this.user.juridicalUser.addressName;
    this.reqData.bankName = this.user.juridicalUser.bankName;
    this.reqData.latitude = this.user.juridicalUser.latitude;
    this.reqData.longitude = this.user.juridicalUser.longitude;
    this.reqData.companyName = this.user.juridicalUser.companyName;
    this.reqData.secondPhoneNumber = this.user.secondPhoneNumber.replace('+374', '');

    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber.replace('+374', '');
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

  getAddress(address): void {
    if (address) {
      this.reqData.addressName = address.formatted_address;
      this.reqData.latitude = address.lat;
      this.reqData.longitude = address.lng;
    }
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
          this.user.juridicalUser.companyName = this.reqData.companyName;
          this.email = this.user.email;
          this.phoneNumber = this.user.phoneNumber.replace('+374', '');
        });
    }
  }
}
