import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { UserService } from '@api/user/user.service';
import { AddressService } from '@api/address/address.service';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { finalize } from 'rxjs/operators';
import { AddressRM } from '@api/address/req/address-req.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent extends BaseComponent implements OnInit {

  addressReqData = new AddressRM();
  addressBtnLoading: boolean = false;
  addressId: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private addressService: AddressService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.queryParams;
    this.addressId = id;
    if (id) this.getAddressDetails(id);
  }

  elevator(): void {
    this.addressReqData.hasElevator = !this.addressReqData.hasElevator;
  }

  getAddress(address): void {
    if (address) {
      this.addressReqData.addressName = address.formatted_address;
      this.addressReqData.latitude = address.lat;
      this.addressReqData.longitude = address.lng;
    }

    if (this.addressReqData.isSubmited) {
      this.addressReqData.validate();
    }
  }

  isDefault(): void {
    this.addressReqData.isDefault = !this.addressReqData.isDefault;
  }

  @Unsubscribe()
  private getAddressDetails(id) {
    return this.addressService.getDetails(id)
    .subscribe((data) => {
      this.addressReqData.addressName = data.addressName;
      this.addressReqData.title = data.title;
      this.addressReqData.apartment = data.apartment;
      this.addressReqData.entrance = data.entrance;
      this.addressReqData.floor = data.floor;
      this.addressReqData.additionalInformation = data.additionalInformation;
      this.addressReqData.isDefault = data.isDefault;
      this.addressReqData.hasElevator = data.hasElevator;
      this.addressReqData.longitude = data.longitude;
      this.addressReqData.latitude = data.latitude;
    });
  }

  @Unsubscribe()
  editAddress() {
    if (this.addressReqData.validate()) {
      this.addressBtnLoading = true;
      return this.addressService.edit(this.addressId, this.addressReqData)
      .pipe(finalize(() => this.addressBtnLoading = false))
      .subscribe((res) => {
        this.router.navigate(['../'], {
          relativeTo: this.activatedRoute,
        });
      });
    }
  }

  @Unsubscribe()
  addAddress() {
    if (this.addressReqData.validate()) {
      this.addressBtnLoading = true;
      return this.addressService.create(this.addressReqData)
      .pipe(finalize(() => this.addressBtnLoading = false))
      .subscribe((res) => {
        this.router.navigate(['../'], {
          relativeTo: this.activatedRoute,
        });
      });
    }
  }
}
