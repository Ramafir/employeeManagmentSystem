import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {ProjectService} from "../../service/project.service";
import {Employee} from "../../interface/employee";
import {HttpErrorResponse} from "@angular/common/http";
import {Project} from "../../interface/project";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
employee: Employee;
employeeProjects: Project[];
theEmployeeId: number = + this.route.snapshot.paramMap.get('id');

  constructor(private employeeService: EmployeeService,
              private projectService: ProjectService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEmployeeDetails();
      this.getEmployeeProjects();
    })
  }

  handleEmployeeDetails() {

    this.employeeService.getEmployee(this.theEmployeeId).subscribe(
      data => {
        this.employee = data;
      }
    )
  }

  getEmployeeProjects(): void {
    this.employeeService.getEmployeeProjects(this.theEmployeeId).subscribe(
      (response: Project[]) => {
        this.employeeProjects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
