import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
tasks: Task[] = [];
  currentUser: any;

  constructor(private authService: AuthService, private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.sharedService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  onCreateNewTask(): void {
    this.router.navigate(['/create-task']);
  }
}
