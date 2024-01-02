package com.example.sportssync_be.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;

    // Credentials
    private String username;
    private String emailAddress;
    private String password;

    // Details
    private String firstName;
    private String lastName;
    private String gender;
    private String profilePicturePath;

    // Activation
    private String token;
    private Boolean isConfirmed;
    private Date createdAt;
}
