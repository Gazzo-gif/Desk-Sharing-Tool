package com.desk_sharing.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.desk_sharing.entities.User;
import com.desk_sharing.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody String email, String password) {
        return userService.loginUser(email, password);
    }

    @PutMapping("/visibility/{id}")
    public boolean changeVisibility(@PathVariable("id") Long id) {
        return userService.changeVisibility(id);
    }

    @PutMapping("/password/{id}")
    public boolean changePassword(@PathVariable("id") Long id, @RequestBody String password) {
        return userService.changePassword(id, password);
    }

    @DeleteMapping("/{id}")
    public boolean deleteDesk(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/get/{id}")
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/admin/{id}")
    public boolean isAdmin(@PathVariable("id") Long id) {
        return userService.isAdmin(id);
    }
}
