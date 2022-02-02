import { Component, OnInit } from '@angular/core';
import {User} from "../interface/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {UserService} from "../service/user.service";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../enum/notification-type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.user = this.authenticationService.getUserFromLocalCache();
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  public isLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  public onLogout () {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login').then(
      () => this.sendNotification(NotificationType.SUCCESS, 'You have been successfully logged out'));
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'AN ERROR OCCURRED, PLEASE TRY AGAIN. ');
    }
  }

}
