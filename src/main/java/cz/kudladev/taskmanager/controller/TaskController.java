package cz.kudladev.taskmanager.controller;


import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {

    @GetMapping("/tasks")
    public String getTasks() {
        return "displaying a list of tasks";
    }

    @GetMapping("/tasks/{id}")
    public String getTask(@PathVariable("id") Long id) {
        return "displaying a task with id " + id;
    }

    @DeleteMapping("/tasks")
    public String deleteTask(@RequestParam("id") Long id) {
        return "deleting a task with id " + id;
    }

}
