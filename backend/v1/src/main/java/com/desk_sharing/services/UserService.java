package com.desk_sharing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.desk_sharing.dto.LoginRequest;
import com.desk_sharing.entities.User;
import com.desk_sharing.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String password, String email) {
        // Check if username is available
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Encode the password before saving to the database
        String encodedPassword = passwordEncoder.encode(password);

        // Create a new user
        User newUser = new User(username, encodedPassword, email);

        // Save the user to the database
        return userRepository.save(newUser);
    }

    public String loginUser(LoginRequest request) {
        // Implement login logic here (verify username and password, generate token, etc.)
        // For simplicity, let's assume a successful login returns a hardcoded token.
        return "someToken";
    }
}
