package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProject(long id);
    Project addProject(Project project);
    Project updateProject(Project project);
    void deleteProject(long id);
    List<Project> getProjectsWithUsers();
}
