import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Employee} from "../interface/employee";
import {catchError, tap} from "rxjs/operators";
import {Project} from "../interface/project";
import {User} from "../interface/user";
import {CustomHttpResponse} from "../interface/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient) {
  }



  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/user/list`);
  }

  public getUser(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/user/find/${id}`);
  }

  public addUser(formData:FormData):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/user/add`,formData);
  }

  public updateUser(formData:FormData):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/user/update`,formData);
  }

  public resetPassword(email:string):Observable<CustomHttpResponse>{
    return this.http.get<CustomHttpResponse>(`${this.apiUrl}/user/resetPassword/${email}`);
  }

  public updateProfileImage(formData:FormData):Observable<HttpEvent<User>>{
    return this.http.post<User>(`${this.apiUrl}/user/updateProfileImage`,formData,
      {reportProgress:true,
        observe:'events'
      });
  }

  public deleteUser(username:string):Observable<CustomHttpResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.apiUrl}/user/delete/${username}`);
  }

  public addUsersToLocalCache(users:User[]):void{
    localStorage.setItem('users',JSON.stringify(users));
  }

  public getUsersFromLocalCache():User[]{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users'))
    }else{
      return null ;
    }
  }

  public createUserFormData(loggedInUsername:string,user:User,profileImage:File):FormData{
    const formData=new FormData();
    formData.append('currentUsername',loggedInUsername);
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('username',user.username);
    formData.append('password',user.password);
    formData.append('email',user.email);
    formData.append('role',user.role);
    formData.append('profileImage',profileImage);
    formData.append('isActive',JSON.stringify(user.active));
    formData.append('isNonLocked',JSON.stringify(user.notLocked));
    return formData;
  }
}

