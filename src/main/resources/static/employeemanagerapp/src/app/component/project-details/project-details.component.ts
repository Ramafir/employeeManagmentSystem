import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../interface/project";
import {catchError, map, startWith} from "rxjs/operators";
import {NotificationService} from "../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../../interface/employee";
import {NotificationType} from "../../enum/notification-type";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public employees: Employee[];
  public employeesInProject: Employee[]
  public projects: Project[];
  public project: Project;
  theProjectId: number = + this.route.snapshot.paramMap.get('id');

  constructor(private employeeService: EmployeeService,
              private projectService: ProjectService,
              private notifier: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProjectDetails();
      this.getProjectEmployees();
    })
  }


  handleProjectDetails() {
    this.projectService.getProject(this.theProjectId).subscribe(
      data => {
        this.project = data;
      }
    )
  }

  getProjectEmployees(): void {
    this.projectService.getProjectEmployees(this.theProjectId).subscribe(
      (response: Employee[]) => {
        this.employeesInProject = response;
        console.log(this.employeesInProject);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

}
