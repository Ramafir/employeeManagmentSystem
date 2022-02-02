package pl.danielkolban.employeemanager.exception.domain;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.BAD_REQUEST,
        reason = "A project with this name already exists")
public class DuplicateProjectNameException extends RuntimeException { }
