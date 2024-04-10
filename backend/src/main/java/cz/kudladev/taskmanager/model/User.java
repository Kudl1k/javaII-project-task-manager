package cz.kudladev.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Setter
@Getter
@ToString
@Entity
@Table(name = "user")
@JsonPropertyOrder({"id", "name", "email", "password", "projects", "tasks"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long Id;

    @Column(name = "name")
    private String Name;

    @Column(name = "email")
    private String Email;

    @Column(name = "password")
    private String Password;

    @OneToMany
    @JoinColumn(name = "task_id")
    private List<Task> tasks;

    @ManyToMany(mappedBy = "users")
    private List<Project> projects;

}
