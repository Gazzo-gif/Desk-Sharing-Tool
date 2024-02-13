package com.desk_sharing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.desk_sharing.entities.User;
import com.desk_sharing.repositories.UserRepository;

@Service
public class UserService  {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public boolean loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Compare the provided password with the encrypted password in the database
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean editVisibility(User user, boolean visibility) {
        try {
            user.setVisibility(visibility);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean changePassword(User user, String password) {
        try {
            user.setPassword(passwordEncoder.encode(password));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
