import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  // input task for editing, undefined for creating new task
  @Input() task?: Task;
  @Output() submitForm = new EventEmitter<Task>();
  taskForm!: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    // initialize form group with form controls and validation
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      deadline: ['', Validators.required],
      category: ['', Validators.required],

      priority: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        deadline: this.task.deadline,
        category: this.task.category,
        priority: this.task.priority,
        status: this.task.status,
      });
    }
  }

  // getter for access to form controls
  get f() {
    return this.taskForm.controls;
  }

  // handle form submission
  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    // create task object to submit
    const task: Task = {
      ...this.taskForm.value,
      createdBy: this.task ? this.task.createdBy : this.currentUser.id,
      id: this.task?.id,
    };

    this.submitForm.emit(task);
  }
}
