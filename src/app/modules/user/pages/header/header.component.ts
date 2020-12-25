import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '@helpers/base.component';
import {User} from '@models/user';
import {PhotoReqModel} from '@api/user/req/photo-req.model';
import {AuthStorage} from '@storage/auth.storage';
import {UserService} from '@api/user/user.service';
import {finalize} from 'rxjs/operators';
import {Unsubscribe} from '@decorators/unsubscribe.decorator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {

  user: User = null;
  uploadBtnLoading: boolean = false;
  deleteBtnLoading: boolean = false;
  confirmModal: boolean = false;
  photoReqModel = new PhotoReqModel();

  constructor(
    private authService: AuthStorage,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  open(open: boolean): void {
    this.confirmModal = open;
  }

  updatePhoto(data: Blob) {
    this.photoReqModel.photo = data;
    this.uploadPhoto();
  }

  deletePhoto() {
    this.deleteBtnLoading = true;
    return this.userService.deletePhoto()
    .pipe(finalize(() => this.deleteBtnLoading = false))
    .subscribe((res) => {
      this.confirmModal = false;
      this.user.imageUrl = null;
    });
  }

  @Unsubscribe()
  uploadPhoto() {
    this.uploadBtnLoading = true;
    return this.userService.uploadPhoto(this.photoReqModel)
    .pipe(finalize(() => this.uploadBtnLoading = false))
    .subscribe((res) => {
      this.user.imageUrl = res.data;
    });
  }
}
