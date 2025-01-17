import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomNotification } from 'src/app/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<CustomNotification | null>(null);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  // show a notification with a list of tasks
  showNewAssignmentNotification(tasks: any[]): void {
    const message = 'New tasks are assigned to you:';
    const notification: CustomNotification = { type: 'assignment', message, tasks };

    this.notificationsSubject.next(notification);
  }

  showStatusNotification(tasks: any[]): void {
    const message = 'The following tasks have their status updated:';
    const notification: CustomNotification = { type: 'status', message, tasks };
    
    this.notificationsSubject.next(notification);
  }

  // clear the notification
  clearNotification(): void {
    this.notificationsSubject.next(null);
  }
}
