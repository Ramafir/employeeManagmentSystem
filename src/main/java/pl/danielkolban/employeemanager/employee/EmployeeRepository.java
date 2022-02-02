package pl.danielkolban.employeemanager.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAllByLastNameContainingIgnoreCase(String lastName);

    Optional<Employee> findByEmail(String email);

}
