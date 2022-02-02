package pl.danielkolban.employeemanager.employee;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.danielkolban.employeemanager.exception.domain.EmailExistException;
import pl.danielkolban.employeemanager.exception.domain.EmployeeNotFoundException;
import pl.danielkolban.employeemanager.project.Project;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static java.lang.Boolean.TRUE;
import static pl.danielkolban.employeemanager.constant.UserImplConstant.EMAIL_ALREADY_EXISTS;

@AllArgsConstructor
@Service
@Slf4j
@Transactional
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        log.info("Fetching all employees");
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        log.info("Fetching employee by id: {}", id);
        return employeeRepository.findById(id).get();
    }

    Employee save(Employee employee) {
        Optional<Employee> employeeByEmail = employeeRepository.findByEmail(employee.getEmail());
        employeeByEmail.ifPresent(u -> {
            throw new EmailExistException(EMAIL_ALREADY_EXISTS);
        });
        log.info("Saving new employee: {}", employee.getFirstName());
        return employeeRepository.save(employee);
    }

    Employee update(Employee employee) {
        Optional<Employee> employeeByEmail = employeeRepository.findByEmail((employee.getEmail()));
        employeeByEmail.ifPresent(e -> {
            if(!e.getId().equals(employee.getId()))
                throw new EmailExistException(EMAIL_ALREADY_EXISTS);
        });
        log.info("Updating employee: {}", employee.getFirstName());
        return employeeRepository.save(employee);
    }

    public Boolean delete(Long id) {
        log.info("Deleting employee by ID: {}", id);
        employeeRepository.deleteById(id);
        return TRUE;
    }

    List<Project> getProjects(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .map(Employee::getProjects)
                .orElseThrow(EmployeeNotFoundException::new);
    }

}
