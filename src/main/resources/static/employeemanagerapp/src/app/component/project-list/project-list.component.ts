import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {NotificationService} from "../../service/notification.service";
import {NgForm} from "@angular/forms";
import {Project} from "../../interface/project";
import {EmployeeService} from "../../service/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Status} from "../../enum/status";
import {Employee} from "../../interface/employee";
import {NotificationType} from "../../enum/notification-type";
import {UserComponent} from "../user/user.component";
import {Role} from "../../enum/role.enum";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public employees: Employee[] = [];
  public projects: Project[] = [];
  public editProject: Project;
  public deleteProject: Project;
  readonly Status = Status;

  constructor(private projectService: ProjectService, private employeeService: EmployeeService, private notifier: NotificationService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getProjects();
    this.getEmployees();
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        if (response.length == 0) {
          this.notifier.notify(NotificationType.WARNING, 'NO PROJECTS FOUND')
        }else {
          this.notifier.notify(NotificationType.INFO, 'PROJECT LIST HAS BEEN LOADED')
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById('add-project-form').click();
    this.projectService.saveProject(addForm.value).subscribe(
      (response: Project) => {
        this.getProjects();
        addForm.reset();
        this.notifier.notify(NotificationType.SUCCESS, 'ADDED NEW PROJECT ' + response.name)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe(
      (response: Project) => {
        this.getProjects();
        this.notifier.notify(NotificationType.SUCCESS, 'UPDATED PROJECT ' + response.name)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(
      (response: void) => {
        this.getProjects();
        this.notifier.notify(NotificationType.SUCCESS, 'PROJECT DELETED')
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProjects(key: string): void {
    const results: Project[] = [];
    for (const project of this.projects) {
      if (project.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || project.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || project.status.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(project);
      }
    }
    this.projects = results;
    if (results.length === 0 || !key) {
      this.getProjects();
    }
  }

  public onOpenModal(project: Project, mode: string): void {
    const container = document.getElementById('project-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    }
    if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-target', '#updateProjectModal');
    }
    if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    }
    container.appendChild(button);
    button.click();
  }

  printReport(): void {
    this.notifier.notify(NotificationType.SUCCESS, 'Report downloaded');
    // window.print();
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('projects');
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'project-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role
  }

}
