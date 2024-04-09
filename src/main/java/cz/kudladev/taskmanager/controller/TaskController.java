package cz.kudladev.taskmanager.controller;


import cz.kudladev.taskmanager.model.Task;
import cz.kudladev.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;


    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/tasks/{id}")
    public String getTask(@PathVariable("id") Long id) {
        return "displaying a task with id " + id;
    }

    @PostMapping("/tasks")
    public String saveTask(@RequestBody Task task) {
        return "Saving a task details " + task;
    }

    @DeleteMapping("/tasks")
    public String deleteTask(@RequestParam("id") Long id) {
        return "deleting a task with id " + id;
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(
            @PathVariable("id") Long id,
            @RequestBody Task task
    ) {
        System.out.println("Updating a task with id " + id);
        return task;
    }

}
