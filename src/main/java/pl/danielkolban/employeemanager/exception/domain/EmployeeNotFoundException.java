package pl.danielkolban.employeemanager.exception.domain;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.BAD_REQUEST,
        reason = "Cannot find this employee")
public class EmployeeNotFoundException extends RuntimeException{
}
