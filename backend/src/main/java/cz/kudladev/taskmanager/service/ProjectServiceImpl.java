package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;
import cz.kudladev.taskmanager.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService{

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProject(long id) {
        return projectRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
    }

    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public List<Project> getProjectsWithUsersAndTask() {
        return projectRepository.findAllWithUsersAndTasks();
    }
}
