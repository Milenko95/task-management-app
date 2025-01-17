import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { CreateTaskComponent } from './components/shared-components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/shared-components/task-table/task-table.component';
import { EditTaskComponent } from './components/shared-components/edit-task/edit-task.component';
import { TaskFormComponent } from './components/shared-components/task-form/task-form.component';
import { NotificationComponent } from './components/shared-components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    UserComponent,
    CreateTaskComponent,
    TaskTableComponent,
    EditTaskComponent,
    TaskFormComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
