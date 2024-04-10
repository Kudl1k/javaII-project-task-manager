package cz.kudladev.taskmanager.controller;


import cz.kudladev.taskmanager.model.Project;
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
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable long id) {
        return taskService.getTask(id);
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable long id, @RequestBody Task task) {
        // Set the ID of the task to be updated
        task.setId(id);
        return taskService.updateTask(task);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable long id) {
        taskService.deleteTask(id);
    }

    @PostMapping("/projects/{projectId}/tasks/{taskId}")
    public Project addTaskToProject(@PathVariable long projectId, @PathVariable long taskId) {
        return taskService.addTaskToProject(projectId, taskId);
    }

    @GetMapping("/projects/{projectId}/tasks/{taskId}")
    public Project getTaskFromProject(@PathVariable long projectId, @PathVariable long taskId) {
        return taskService.getTaskFromProject(projectId, taskId);
    }

    @PutMapping("/projects/{projectId}/tasks/{taskId}")
    public Project updateTaskFromProject(@PathVariable long projectId, @PathVariable long taskId, @RequestBody Project project) {
        return taskService.updateTaskFromProject(projectId, taskId, project);
    }

    @DeleteMapping("/projects/{projectId}/tasks/{taskId}")
    public void deleteTaskFromProject(@PathVariable long projectId, @PathVariable long taskId) {
        taskService.deleteTaskFromProject(projectId, taskId);
    }
}

