package cz.kudladev.taskmanager.controller;

import cz.kudladev.taskmanager.exceptions.UserNotFoundException;
import cz.kudladev.taskmanager.model.Project;
import cz.kudladev.taskmanager.model.User;
import cz.kudladev.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving users: " + e.getMessage());
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable long id){
        try {
            User user = userService.getUser(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user: " + e.getMessage());
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user){
        try {
            User newUser = userService.addUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user: " + e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody User user){
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
    }

    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(@RequestParam long id){
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    @PostMapping("/users/{userId}/projects/{projectId}")
    public ResponseEntity<?> addUserToProject(@PathVariable long projectId, @PathVariable long userId){
        try {
            Project project = userService.addUserToProject(projectId, userId);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user to project: " + e.getMessage());
        }
    }

    @GetMapping("/projects/{projectId}/users/{userId}")
    public ResponseEntity<?> getUserFromProject(@PathVariable long projectId, @PathVariable long userId){
        try {
            Project project = userService.getUserFromProject(projectId, userId);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user from project: " + e.getMessage());
        }
    }

    @PutMapping("/projects/{projectId}/users/{userId}")
    public ResponseEntity<?> updateUserFromProject(@PathVariable long projectId, @PathVariable long userId, @RequestBody Project project){
        try {
            Project updatedProject = userService.updateUserFromProject(projectId, userId, project);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user from project: " + e.getMessage());
        }
    }

    @DeleteMapping("/projects/{projectId}/users/{userId}")
    public ResponseEntity<?> deleteUserFromProject(@PathVariable long projectId, @PathVariable long userId){
        try {
            userService.deleteUserFromProject(projectId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user from project: " + e.getMessage());
        }
    }
}

