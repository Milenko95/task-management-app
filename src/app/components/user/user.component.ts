import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notifications/notifications.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  tasks: Task[] = [];
  currentUser: any;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
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
    const newTasks: any[] = [];

    tasks.forEach((task) => {
      // check if the task is assigned to the current user and if isUserNotified is false
      if (task.assignedTo === this.currentUser && !task.isUserNotified) {
        newTasks.push({ title: task.title, priority: task.priority });

        // task.isUserNotified = true;

        this.sharedService.updateTask(task.id, task).subscribe({
          next: () =>
            console.log(`Task ${task.title} updated to isUserNotified: true`),
          error: (err) =>
            console.error(`Error updating task: ${task.title}`, err),
        });
      }
    });

    if (newTasks.length > 0) {
      this.notificationService.showNewAssignmentNotification(newTasks);
    }
  }
}
