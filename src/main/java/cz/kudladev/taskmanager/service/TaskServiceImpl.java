package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.Task;
import cz.kudladev.taskmanager.repository.ProjectRepository;
import cz.kudladev.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;


import java.util.List;



@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTask(long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Project addTaskToProject(long projectId, long taskId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        project.getTasks().add(task);
        return projectRepository.save(project);
    }

    @Override
    public Project getTaskFromProject(long projectId, long taskId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        if (project.getTasks().contains(task)) {
            return project;
        } else {
            throw new EntityNotFoundException("Task with id " + taskId + " is not associated with project with id " + projectId);
        }
    }

    @Override
    public Project updateTaskFromProject(long projectId, long taskId, Project project) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        Task taskToUpdate = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        if (existingProject.getTasks().contains(taskToUpdate)) {
            // Update task properties if needed
            return projectRepository.save(project);
        } else {
            throw new EntityNotFoundException("Task with id " + taskId + " is not associated with project with id " + projectId);
        }
    }

    @Override
    public void deleteTaskFromProject(long projectId, long taskId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        project.getTasks().remove(task);
        projectRepository.save(project);
    }
}
