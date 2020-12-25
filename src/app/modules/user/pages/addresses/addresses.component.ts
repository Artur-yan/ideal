import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { AddressService } from '@api/address/address.service';
import { Unsubscribe } from '@decorators/unsubscribe.decorator';
import { AddressModel } from '@api/address/res/address.model';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent extends BaseComponent implements OnInit {

  addresses: AddressModel[] = [];
  addressBtnLoading: boolean = false;
  confirmModal: boolean = false;
  addressId: string;
  inProgress: boolean = false;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  toEdit(id): void {
    this.router.navigate(['./edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        id,
      },
    });
  }

  close(): void {
    this.confirmModal = false;
  }

  deleteModal(id: string): void {
    this.confirmModal = true;
    this.addressId = id;
  }

  @Unsubscribe()
  public delete() {
      return this.addressService.delete(this.addressId)
      .pipe(finalize(() => this.addressBtnLoading = false))
      .subscribe(() => {
        this.confirmModal = false;
        this.getAddresses();
      });
  }

  @Unsubscribe()
  private getAddresses() {
    this.inProgress = true;
    return this.addressService.getAll()
      .pipe(finalize(() => this.inProgress = false))
      .subscribe((data) => {
        this.addresses = data;
      });
  }

}
