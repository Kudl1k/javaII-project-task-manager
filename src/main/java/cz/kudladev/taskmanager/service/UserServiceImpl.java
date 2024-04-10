package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;
import cz.kudladev.taskmanager.repository.ProjectRepository;
import cz.kudladev.taskmanager.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    @Override
    public User addUser(User user) {
        // Perform validation if needed
        return userRepository.save(user);
    }

    @Override
    public User updateUser(long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setProjects(user.getProjects());
        existingUser.setTasks(user.getTasks());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(long id) {
        // Perform validation if needed
        userRepository.deleteById(id);
    }

    @Override
    public Project addUserToProject(long projectId, long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        project.getUsers().add(user);
        return projectRepository.save(project);
    }

    @Override
    public Project getUserFromProject(long projectId, long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        if (project.getUsers().contains(user)) {
            return project;
        } else {
            throw new EntityNotFoundException("User with id " + userId + " is not associated with project with id " + projectId);
        }
    }

    @Override
    public Project updateUserFromProject(long projectId, long userId, Project project) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User userToUpdate = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        if (existingProject.getUsers().contains(userToUpdate)) {
            // Update user properties if needed
            return projectRepository.save(project);
        } else {
            throw new EntityNotFoundException("User with id " + userId + " is not associated with project with id " + projectId);
        }
    }

    @Override
    public void deleteUserFromProject(long projectId, long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        project.getUsers().remove(user);
        projectRepository.save(project);
    }
}
