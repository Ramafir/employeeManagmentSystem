package pl.danielkolban.employeemanager.project;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.danielkolban.employeemanager.employee.Employee;
import pl.danielkolban.employeemanager.exception.domain.EmployeeNotFoundException;
import pl.danielkolban.employeemanager.exception.domain.DuplicateProjectNameException;
import pl.danielkolban.employeemanager.exception.domain.ProjectNotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

@AllArgsConstructor
@Service
@Slf4j
@Transactional
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> findAll() {
        log.info("Fetching all servers");
        return projectRepository.findAll();
    }

    public Project findById(Long id) {
        log.info("Fetching project by id: {}", id);
        return projectRepository.findById(id).
                orElseThrow(ProjectNotFoundException::new);
    }

    public Project save(Project project) {
        Optional<Project> projectByName = projectRepository.findByName(project.getName());
        projectByName.ifPresent(u -> {
            throw new DuplicateProjectNameException();
        });
        log.info("Saving new project: {}", project.getName());
        return projectRepository.save(project);
    }

    public Project update(Project project) {
        Optional<Project> projectByName = projectRepository.findByName((project.getName()));
        projectByName.ifPresent(p -> {
            if (!p.getId().equals(project.getId()))
                throw new DuplicateProjectNameException();
        });
        log.info("Updating project: {}", project.getName());
        return projectRepository.save(project);
    }

    public Boolean delete(Long id) {
        log.info("Deleting project by ID: {}", id);
        projectRepository.deleteById(id);
        return TRUE;
    }

    List<Employee> getEmployees(Long projectId) {
        return projectRepository.findById(projectId)
                .map(Project::getEmployees)
                .orElseThrow(EmployeeNotFoundException::new);
    }

}
