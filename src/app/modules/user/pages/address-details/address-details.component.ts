import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { AddressService } from '@api/address/address.service';
import { BaseComponent } from '@helpers/base.component';
import { finalize } from 'rxjs/operators';
import { AddressRM } from '@api/address/req/address-req.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent extends BaseComponent implements OnInit {

  reqData = new AddressRM();
  btnLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDetails();
  }

  submit() {
    if (this.route.snapshot.params.id) {
      this.editAddress();
    } else {
      this.createAddress();
    }
  }

  @Unsubscribe()
  private createAddress() {
    if (this.reqData.validate()) {
      this.btnLoading = true;
      return this.addressService.create(this.reqData)
        .pipe(finalize(() => this.btnLoading = false))
        .subscribe();
    }
  }

  @Unsubscribe()
  private editAddress() {
    if (this.reqData.validate()) {
      this.btnLoading = true;
      return this.addressService.edit(this.route.snapshot.params.id, this.reqData)
        .pipe(finalize(() => this.btnLoading = false))
        .subscribe();
    }
  }

  @Unsubscribe()
  private getDetails() {
    const { id } = this.route.snapshot.params;
    if (id) {
      return this.addressService.getDetails(id)
        .subscribe((data) => {
          this.reqData.title = data.title;
          this.reqData.addressName = data.addressName;
          this.reqData.apartment = data.apartment;
          this.reqData.building = data.building;
          this.reqData.entrance = data.entrance;
          this.reqData.floor = data.floor;
          this.reqData.isDefault = data.isDefault;
          this.reqData.latitude = data.latitude;
          this.reqData.longitude = data.longitude;
        });
    }
  }

}
