package pl.danielkolban.employeemanager.employee;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import pl.danielkolban.employeemanager.project.Project;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="*Must give a first name")
    @Size(min=2, max=50)
    private String firstName;

    @NotBlank(message="*Must give a last name")
    @Size(min=1, max=50)
    private String lastName;

    @NotBlank
    @Email(message="*Must be a valid email address")
    private String email;

    @ManyToMany(mappedBy = "employees")
    @JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
    private List<Project> projects = new ArrayList<>();
}
