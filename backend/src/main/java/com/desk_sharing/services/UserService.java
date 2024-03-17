package com.desk_sharing.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.hibernate.proxy.HibernateProxy;
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

    public User getUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user instanceof HibernateProxy) {
            HibernateProxy hibernateProxy = (HibernateProxy) user;
            user = (User) hibernateProxy.getHibernateLazyInitializer().getImplementation();
        }
        return user;
    }

    public User registerUser(User user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            // Encrypt the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
    
            return userRepository.save(user);
        }
        else return null;
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
            else return null;
        }
        return null;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public int changeVisibility(Long id) {
        try {
            User user = userRepository.getById(id);
            if (user.getVisibility()) {
                user.setVisibility(false);
                userRepository.save(user);
                return 0;
            } else {
                user.setVisibility(true);
                userRepository.save(user);
                return 1;
            }
        } catch (Exception e) {
            return -1;
        }
    }
    
    public User updateUserById(Long id, User user) {
        try {
            User userFromDB = userRepository.getById(id);
            if (userFromDB != null) {
            	
            	if (userRepository.existsByEmail(user.getEmail()) && !userFromDB.getEmail().equals(user.getEmail())) {
            		return null;
            	}
            	
            	if(user.getEmail() != null) {
            		userFromDB.setEmail(user.getEmail());
            	}
            	
            	if(user.getName() != null) {
            		userFromDB.setName(user.getName());
            	}
            	
            	if(user.getSurname() != null) {
            		userFromDB.setSurname(user.getSurname());
            	}
            	System.out.println(user.isAdmin()+"==="+user.getVisibility());
            	userFromDB.setVisibility(user.getVisibility());
            	userFromDB.setAdmin(user.isAdmin());
                return userRepository.save(userFromDB);
            }
        } catch (Exception e) {
            return null;
        }
        return null;
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
    
    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAdmin(Long id) {
        User user = userRepository.getById(id);
        return user.isAdmin();
    }
}
