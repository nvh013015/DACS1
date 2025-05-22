package com.sv.backend.user;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.sv.backend.user.dto.signUp;
import com.sv.backend.user.userUtil.Security;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody signUp signUp) {
        try {
            User user = new User();
            user.setUsername(signUp.getUsername());
            user.setEmail(signUp.getEmail());
            String passwordHash = Security.encodePassword(signUp.getPassword());
            user.setPasswordHash(passwordHash);

            boolean isRegistered = userService.registerUser(user);
            if (isRegistered) {
                return ResponseEntity.ok("User registered successfully");
            } else {
                return ResponseEntity.status(400).body("Username or email already exists");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody signUp signUp) {
        try {
            User user = userService.findByUsername(signUp.getUsername());
            if (user != null && Security.checkPassword(signUp.getPassword(), user.getPasswordHash())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(401).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
    
}
