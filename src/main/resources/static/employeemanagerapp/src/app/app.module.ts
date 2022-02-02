import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import {EmployeeService} from "./service/employee.service";
import {ProjectService} from "./service/project.service";
import { ProjectDetailsComponent } from './component/project-details/project-details.component';
import { LoginComponent } from './component/login/login.component';
import {UserService} from "./service/user.service";
import { RegisterComponent } from './component/register/register.component';
import {AuthenticationService} from "./service/authentication.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthenticationGuard} from "./component/guard/authentication.guard";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./service/notification.service";
import {UserComponent} from "./component/user/user.component";
import {HeaderComponent} from "./header/header.component";


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path: 'employee', component: EmployeeListComponent},
  {path: 'project', component: ProjectListComponent},
  {path: 'employee/:id', component: EmployeeDetailsComponent},
  {path: 'project/:id', component: ProjectDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:id', component: UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    ProjectListComponent,
    EmployeeDetailsComponent,
    ProjectDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NotificationModule

  ],
  providers: [AuthenticationGuard, NotificationService, EmployeeService, ProjectService, UserService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
