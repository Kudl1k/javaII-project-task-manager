package cz.kudladev.taskmanager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Setter
@Getter
@ToString
@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "project_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "project")
    private List<Task> tasks;

    @ManyToMany
    @JoinTable(
            name = "user_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

}
