import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth.service';
import { map, Observable, switchMap } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // get a task by id
  getTaskById(taskId: string): Observable<Task | undefined> {
    return this.http.get<Task[]>(`${this.apiUrl}`).pipe(
      map((tasks) => {
        return tasks.find((task) => task.id === taskId); 
      })
    );
  }

  // create a new task 
  createTask(task: Task): Observable<Task> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      task.createdBy = currentUser;
    }
    return this.http.post<Task>(this.apiUrl, task);
  }

  // update an existing task - only available for the user who created the task
  updateTask(id: string, task: Task): Observable<Task> {
    const currentUser = this.authService.getCurrentUser();
    const currentUserRole = this.authService.getRole();

    if (
      currentUser &&
      task.createdBy !== currentUser &&
      currentUserRole !== 'Admin'
    ) {
      throw new Error('You can only edit tasks you created');
    }
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // delete a task - only available for the user who created the task and admin
  deleteTask(id: string): Observable<void> {
    const currentUser = this.authService.getCurrentUser();
    const currentUserRole = this.authService.getRole();

    if (currentUser) {
      return this.getTaskById(id).pipe(
        // check if the current user is the creator of the task before deleting
        switchMap((task) => {
          if (
            task &&
            task.createdBy !== currentUser &&
            currentUserRole !== 'Admin'
          ) {
            throw new Error('You can only delete tasks you created');
          }
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        })
      );
    }
    return new Observable<void>();
  }
}
