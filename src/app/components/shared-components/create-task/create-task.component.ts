import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

   // Handle form submission from the shared task form component
   onCreateTask(task: Task): void {
    this.sharedService.createTask(task).subscribe(
      (createdTask) => {
        this.router.navigate(['/user']); // Navigate to the user page after task creation
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }
}
