package cz.kudladev.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;


@Setter
@Getter
@ToString
@Entity
@Table(name = "user")
@JsonPropertyOrder({"id", "name", "surname" , "email", "projects", "tasks"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long Id;

    @Column(name = "name")
    @NotBlank
    private String Name;

    @Column(name = "surname")
    @NotBlank
    private String Surname;

    @Column(name = "email")
    @NotBlank
    private String Email;

    @OneToMany
    @JsonIgnore
    @JoinColumn(name = "task_id")
    private List<Task> tasks;

    @ManyToMany(mappedBy = "users",fetch = FetchType.LAZY)
    @JsonIgnore
    @JsonBackReference
    private List<Project> projects;

}
