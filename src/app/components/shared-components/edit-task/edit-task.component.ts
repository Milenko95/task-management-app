import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  task: Task | undefined;
  taskLoaded: boolean = false;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';

    // fetch the task data by id
    this.sharedService
      .getTaskById(this.taskId)
      .subscribe((task: Task | undefined) => {
        if (
          task &&
          (task.createdBy === this.authService.getCurrentUser() ||
            this.authService.getRole() === 'Admin')
        ) {
          this.task = task;
          this.taskLoaded = true;
        } else {
          alert('You are not authorized to edit this task.');
          this.router.navigate(['/user']);
        }
      });
  }

  // handle form submission from the shared task form component
  onEditTask(task: Task): void {
    this.sharedService.updateTask(this.taskId, task).subscribe(
      (updatedTask) => {
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Error updating task', error);
      }
    );
  }
}
