import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { CreateTaskComponent } from './components/shared-components/create-task/create-task.component';
import { AuthGuard } from './guards/auth.guard';
import { EditTaskComponent } from './components/shared-components/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] } },
  { path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'User'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
