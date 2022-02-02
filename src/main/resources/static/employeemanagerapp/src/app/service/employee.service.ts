import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Employee} from "../interface/employee";
import {Project} from "../interface/project";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private readonly apiUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }


  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public getEmployee(theEmployeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/get/${theEmployeeId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public getEmployeeProjects(employeeId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/employee/${employeeId}/projects`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/save`, employee)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/update/${employee.id}`, employee)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${employeeId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occurred - Error code: ${error.status}`);
  }
}
