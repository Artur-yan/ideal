import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@helpers/base.component';
import { UserService } from '@api/user/user.service';
import { AuthStorage } from '@storage/auth.storage';
import { UserTypeEnum } from '@enums/user-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent implements OnInit {

  userTypeValue: UserTypeEnum = this.authService.getUser().userTypeValue;
  UserTypeEnum = UserTypeEnum;

  constructor(
    private userService: UserService,
    private authService: AuthStorage,
  ) {
    super();
  }

  ngOnInit(): void {}
}
