package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Credentials
    @Column
    private String username;

    @Column
    private String emailAddress;

    @Column
    private String password;

    // Details
    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String gender;

    @Column
    private String profilePicturePath;

    // Activation
    @Column
    private String token;

    @Column
    private Boolean isConfirmed;

    @Column
    private Date createdAt;
}
