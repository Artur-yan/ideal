import { Component, OnInit } from '@angular/core';
import { AuthStorage } from '@storage/auth.storage';
import { RoleEnum } from '@enums/role.enum';
import { Router } from '@angular/router';
import { NotificationService } from '@api/notifications/notification.service';
import { PagingRequest } from '@models/paging-request';
import { finalize } from 'rxjs/operators';
import { Notification } from '@models/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isOpen: boolean = false;
  profileMenu: boolean = false;
  notificationsPopUp: boolean = false;
  notificationLoad: boolean = false;
  unseenNotifications: number;
  notifications: Notification[] = [];
  pagingReq = new PagingRequest();
  isLoggedIn = this.authStorage.getRoleFromToken() === RoleEnum.User;
  logoutModalState: boolean;

  constructor(
    private authStorage: AuthStorage,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.getUnseenNotifications();
    }
  }

  closeProfile() {
    this.profileMenu = false;
  }
  
  openLogoutModal() {
    this.logoutModalState = true;
  }

  closeLogoutModal() {
    this.logoutModalState = false;
  }

  getUnseenNotifications(): void {
    this.notificationService.getUnseen()
      .subscribe((data) => {
        this.unseenNotifications = data.data;
      });
  }

  updatePageGetNotifications() {
    if (!this.notificationLoad) {
      this.pagingReq.page++;
      this.getNotifications();
    }
  }

  getNotifications(): void {
    this.notificationLoad = true;
    this.notificationService.getAll(this.pagingReq)
      .pipe(finalize(() => this.notificationLoad = false))
      .subscribe((data) => {
        this.notifications = [...this.notifications, ...data.data];
      });
  }

  showNotifications(show: boolean): void {
    if (show) {
      this.getNotifications();
    }
    this.notificationsPopUp = show;
  }

  toProfile(): void {
    if (this.isLoggedIn) {
      this.profileMenu = true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logOut(): void {
    this.authStorage.logout();
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
