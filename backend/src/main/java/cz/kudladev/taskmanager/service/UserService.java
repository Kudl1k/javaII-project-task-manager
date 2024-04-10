package cz.kudladev.taskmanager.service;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUser(long id);
    User addUser(User user);
    User updateUser(long id, User user);
    void deleteUser(long id);

    Project addUserToProject(long projectId, long userId);
    Project getUserFromProject(long projectId, long userId);
    Project updateUserFromProject(long projectId, long userId, Project project);
    void deleteUserFromProject(long projectId, long userId);

}
