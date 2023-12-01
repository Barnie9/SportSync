package com.example.sportssync_be.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String password;
    private String profilePicture;
    private String gender;
    private String token;
    private boolean isConfirmed;
    private Date createdAt;
}
