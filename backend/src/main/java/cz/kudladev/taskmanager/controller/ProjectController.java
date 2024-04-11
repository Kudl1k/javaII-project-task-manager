package cz.kudladev.taskmanager.controller;


import org.springframework.web.bind.annotation.RestController;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getProjectsWithUsers();
    }

    @GetMapping("/projects/{id}")
    public Project getProject(@PathVariable long id) {
        return projectService.getProject(id);
    }

    @PostMapping("/projects")
    public Project addProject(@RequestBody Project project) {
        return projectService.addProject(project);
    }

    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable long id, @RequestBody Project project) {
        project.setId(id);
        return projectService.updateProject(project);
    }



    @DeleteMapping("/projects/{id}")
    public void deleteProject(@PathVariable long id) {
        projectService.deleteProject(id);
    }
}

