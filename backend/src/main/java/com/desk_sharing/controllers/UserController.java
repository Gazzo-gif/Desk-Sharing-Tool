package com.desk_sharing.controllers;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User answer = userService.loginUser(user.getEmail(), user.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(answer);
    }

    @PutMapping("/visibility/{id}")
    public int changeVisibility(@PathVariable("id") Long id) {
        return userService.changeVisibility(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable("id") Long id, @RequestBody User user) {
    	User updateUser = userService.updateUserById(id, user);
        HttpStatus status = (updateUser != null) ? HttpStatus.OK : HttpStatus.CONFLICT;
        return ResponseEntity.status(status).body(updateUser);
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<Boolean> changePassword(@PathVariable("id") Long id, @RequestBody Map<String, String> request) {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
    
        boolean answer = userService.changePassword(id, oldPassword, newPassword);
        HttpStatus status = (answer) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(answer);
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
