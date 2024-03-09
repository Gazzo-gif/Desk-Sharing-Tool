package com.desk_sharing.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = {"http://188.34.162.76:3000", "http://localhost:3000"})
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        HttpStatus status = (newUser != null) ? HttpStatus.OK : HttpStatus.CONFLICT;
        return ResponseEntity.status(status).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Long> loginUser(@RequestBody User user) {
        Long id = userService.loginUser(user.getEmail(), user.getPassword());
        HttpStatus status = (id != -1) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(id);
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
