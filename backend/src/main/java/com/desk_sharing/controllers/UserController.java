package com.desk_sharing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desk_sharing.dto.LoginRequest;
import com.desk_sharing.dto.RegistrationRequest;
import com.desk_sharing.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        try {
            userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail());
            return ResponseEntity.ok("Registration successful.");
        } catch (IllegalArgumentException e) {
            // Handle the case where the username is already taken
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
    }

    // public User registerUser(@RequestBody RegistrationRequest request) {
    //     return userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail());
    // }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
        String token = userService.loginUser(request);
        return ResponseEntity.ok("Login successful. Token: " + token);
    }
}

