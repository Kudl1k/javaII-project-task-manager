package cz.kudladev.taskmanager.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Task {

    private Long id;

    private String name;

    private String description;

    private String date;

    private char progress;


}
