import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notifications/notifications.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  tasks: Task[] = [];
  currentUser: any;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.sharedService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;

        if (this.currentUser) {
          this.checkAndNotifyUserTasks(tasks);
        }
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  checkAndNotifyUserTasks(tasks: Task[]): void {
    console.log('check and notift');

    const statusChangedTasks: any[] = [];

    tasks.forEach((task) => {
      // check if task status changed and send notificaiton to admin
      if (task.statusHasChanged) {
        statusChangedTasks.push({ title: task.title, status: task.status });

        // reset statusHasChanged after notifying
        task.statusHasChanged = false;

        // update the task's statusHasChanged
        this.sharedService.updateTask(task.id, task).subscribe({
          next: () =>
            console.log(
              `Task ${task.title} updated to statusHasChanged: false`
            ),
          error: (err) =>
            console.error(`Error updating task: ${task.title}`, err),
        });
      }
    });

    // notify about tasks with changed status - completed
    if (statusChangedTasks.length > 0) {
      this.notificationService.showStatusNotification(statusChangedTasks);
    }
  }
}
