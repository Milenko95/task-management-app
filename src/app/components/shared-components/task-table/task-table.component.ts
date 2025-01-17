import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnChanges, OnInit {
  currentUser: any;
  currentUserRole: any;
  @Input() tasks: Task[] = [];
  filterText: string = '';
  filteredTasks: Task[] = [];
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && changes['tasks'].currentValue) {
      this.filteredTasks = [...this.tasks];
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserRole = this.authService.getRole();
  }

  tableColumns: { header: string; field: keyof Task }[] = [
    { header: 'ID', field: 'id' },
    { header: 'Title', field: 'title' },
    { header: 'Description', field: 'description' },
    { header: 'Category', field: 'category' },
    { header: 'Priority', field: 'priority' },
    { header: 'Due date', field: 'deadline' },
    { header: 'Created By', field: 'createdBy' },
    { header: 'Assigned To', field: 'assignedTo' },
    // { header: 'Status', field: 'status' },
  ];

  statusOptions = ['Pending', 'In Progress', 'Completed'];

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: keyof Task): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredTasks.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTasks = this.tasks.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    this.currentPage = 1;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTasks.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.pageSize);
  }
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // handle status change
  onStatusChange(taskId: string, newStatus: string): void {
    const taskToUpdate = this.paginatedData.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.status = newStatus;

      // only update status if task is completed
      taskToUpdate.statusHasChanged = newStatus === 'Completed';
      
      this.sharedService.updateTask(taskId, taskToUpdate).subscribe({
        next: (updatedTask) => {
          console.log(`Task ${taskToUpdate.title} updated with new status: ${newStatus}`);
        },
        error: (err) => {
          console.error(`Error updating task status`, err);
        },
      });
    }
  }

  onCreateNewTask(): void {
    this.router.navigate(['/create-task']);
  }
  
  onEdit(taskId: string): void {
    this.router.navigate(['/edit-task', taskId]);
  }

  onDelete(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.sharedService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
          // this.paginatedData = this.paginatedData.filter((task) => task.id !== taskId);
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
}
