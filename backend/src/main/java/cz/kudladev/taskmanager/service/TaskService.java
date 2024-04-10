package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    Task getTask(long id);
    Task addTask(Task task);
    Task updateTask(Task task);
    void deleteTask(long id);

    Project addTaskToProject(long projectId, long taskId);
    Project getTaskFromProject(long projectId, long taskId);
    Project updateTaskFromProject(long projectId, long taskId, Project project);
    void deleteTaskFromProject(long projectId, long taskId);
}
