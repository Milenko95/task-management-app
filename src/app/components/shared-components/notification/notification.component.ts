import { Component, OnInit } from '@angular/core';
import { CustomNotification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: CustomNotification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      (notification) => {
        this.notification = notification;
      }
    );
  }

  dismissNotification() {
    this.notificationService.clearNotification();
  }
}
