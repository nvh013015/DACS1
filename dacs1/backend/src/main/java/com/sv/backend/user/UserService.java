package com.sv.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return false; 
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return false;
        }
        else {
            userRepository.save(user);
            return true;
        }
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
