package cz.kudladev.taskmanager.controller;

import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;
import cz.kudladev.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id){
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable long id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users")
    public void deleteUser(@RequestParam long id){
        userService.deleteUser(id);
    }

    @PostMapping("/users/{userId}/projects/{projectId}")
    public Project addUserToProject(@PathVariable long projectId, @PathVariable long userId){
        return userService.addUserToProject(projectId, userId);
    }

    @GetMapping("/projects/{projectId}/users/{userId}")
    public Project getUserFromProject(@PathVariable long projectId, @PathVariable long userId){
        return userService.getUserFromProject(projectId, userId);
    }

    @PutMapping("/projects/{projectId}/users/{userId}")
    public Project updateUserFromProject(@PathVariable long projectId, @PathVariable long userId, @RequestBody Project project){
        return userService.updateUserFromProject(projectId, userId, project);
    }

    @DeleteMapping("/projects/{projectId}/users/{userId}")
    public void deleteUserFromProject(@PathVariable long projectId, @PathVariable long userId){
        userService.deleteUserFromProject(projectId, userId);
    }
}
