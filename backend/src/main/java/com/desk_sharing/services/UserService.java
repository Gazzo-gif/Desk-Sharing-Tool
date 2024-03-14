<<<<<<< HEAD
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

    /**
     * Function to get all the users in the database
     * 
     * @return a list with all the users and their information
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Function to get a user by its ID
     * 
     * @return all the inforamtion of the user we are looking for
     */
    public User getUser(Long id) {
        return userRepository.getById(id);
    }

    /**
     * Function to add a new user to the database, it will encrypt the given password
     * 
     * @param user user we want to register
     * @return the saved entity
     */
    public User registerUser(User user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            // Encrypt the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
    
            return userRepository.save(user);
        }
        else return null;
    }

    /**
     * Function to loging in the app
     * 
     * @param email users login wiht their email instead of the ID or username
     * @param password password that should correspond with the user
     * @return true if there wasn't any error, false if something went wrong
     */
    public Long loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user.getId();
            }
            else return (long) -1;
        }
        return (long) -1;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Function to edit the visibility of a user (true visible, false anonymous)
     * 
     * @param id user's ID
     * @return true if there wasn't any error, false if something went wrong
     */
    public boolean changeVisibility(Long id) {
        try {
            User user = userRepository.getById(id);
            if (user.getVisibility()) {
                user.setVisibility(false);
            } else user.setVisibility(true);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Function to change a user's password. Assuming there was some type of verification for the password
     * 
     * @param id user's ID
     * @param password password to what you want to change
     * @return true if there wasn't any error, false if something went wrong
     */
    public boolean changePassword(Long id, String password) {
        try {
            User user = userRepository.getById(id);
            user.setPassword(passwordEncoder.encode(password));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // This could be the verification we need for changing the password
    public boolean checkPassword(User user, String password) {
        if (user.getPassword() == password) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Function to delete an user
     * @param id ID of the user we want to delete
     * @return true if there wasn't any error, false if something went wrong
     */
    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Function to get if an user is admin or not
     * @param id ID of the user we want to get the information of
     * @return true if it is an admin, false if it's not
     */
    public boolean isAdmin(Long id) {
        User user = userRepository.getById(id);
        return user.isAdmin();
    }
}
=======
package com.desk_sharing.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

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

    /**
     * Function to get all the users in the database
     * 
     * @return a list with all the users and their information
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Function to get a user by its ID
     * 
     * @return all the inforamtion of the user we are looking for
     */
    public User getUser(Long id) {
        return userRepository.getById(id);
    }

    /**
     * Function to add a new user to the database, it will encrypt the given password
     * 
     * @param user user we want to register
     * @return the saved entity
     */
    public User registerUser(User user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            // Encrypt the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
    
            return userRepository.save(user);
        }
        else return null;
    }

    /**
     * Function to loging in the app
     * 
     * @param email users login wiht their email instead of the ID or username
     * @param password password that should correspond with the user
     * @return true if there wasn't any error, false if something went wrong
     */
    public Long loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Compare the provided password with the encrypted password in the database
//            if (passwordEncoder.matches(password, user.getPassword())) {
//                return user.getId();
//            }
//            // return passwordEncoder.matches(password, user.getPassword());
//            else return (long) -1;
        	return user.getId();
        }
        return (long) -1;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Function to edit the visibility of a user (true visible, false anonymous)
     * 
     * @param id user's ID
     * @return true if there wasn't any error, false if something went wrong
     */
    public boolean changeVisibility(Long id) {
        try {
            User user = userRepository.getById(id);
            if (user.getVisibility()) {
                user.setVisibility(false);
            } else user.setVisibility(true);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public enum ChangePasswordResult {
        PASSWORD_CHANGED,
        USER_NOT_FOUND,
        INCORRECT_OLD_PASSWORD,
        ERROR
    }
    
    public boolean changePassword(Long id, String oldPassword, String newPassword) {
        try {
            User user = userRepository.getById(id);
            if (user != null && passwordEncoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            } else if (user == null) {
                return false;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Function to delete an user
     * @param id ID of the user we want to delete
     * @return true if there wasn't any error, false if something went wrong
     */
    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Function to get if an user is admin or not
     * @param id ID of the user we want to get the information of
     * @return true if it is an admin, false if it's not
     */
    public boolean isAdmin(Long id) {
        User user = userRepository.getById(id);
        return user.isAdmin();
    }
}
>>>>>>> b270e92 (admin panal rooms and desks)
