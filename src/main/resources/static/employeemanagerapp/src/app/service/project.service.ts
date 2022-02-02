import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Project} from "../interface/project";
import {Status} from "../enum/status";
import {Employee} from "../interface/employee";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public getProject(theProjectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/project/get/${theProjectId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public getProjectEmployees(projectId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/project/${projectId}/employees`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/project/save`, project)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/project/update/${project.id}`, project)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  }


  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/project/delete/${projectId}`)
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
