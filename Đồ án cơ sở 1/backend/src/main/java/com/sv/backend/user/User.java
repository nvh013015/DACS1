package com.sv.backend.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userID;

    @Column(name = "Username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "PasswordHash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "Friends", length = 255)
    private String friends;

    @Column(name = "DisplayName", length = 100)
    private String displayName;

    @Column(name = "StatusMessage", length = 255)
    private String statusMessage;

    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "LastLoginAt")
    private LocalDateTime lastLoginAt;

    @Column(name = "IsOnline")
    private Boolean isOnline = false;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
