package pl.danielkolban.employeemanager.project;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.danielkolban.employeemanager.employee.Employee;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectResource {
    private final ProjectService projectService;

    public ProjectResource(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectService.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{id}/employees")
    public ResponseEntity<List<Employee>> getProjectEmployees(@PathVariable("id") Long id) {
        List<Employee> employees = projectService.getEmployees(id);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Project> saveProject(@RequestBody @Valid Project project) {
        Project newProject = projectService.save(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody @Valid Project project) {
        if(!id.equals(project.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The updated object must have an id that matches the id in the resource path");
        Project updateProject = projectService.update(project);
        return new ResponseEntity<>(updateProject, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") Long id) {
        Project project = projectService.findById(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable("id") Long id) {
        projectService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}