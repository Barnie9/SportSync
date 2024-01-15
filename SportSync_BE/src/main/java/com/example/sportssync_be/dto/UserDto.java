package com.example.sportssync_be.dto;

import java.time.LocalDate;
import java.util.Date;

public record UserDto (Long id, RatingDto rating, String username, String emailAddress, String password, String firstName, String lastName, LocalDate birthDate, String phoneNumber, String foot, String position, String profilePicturePath, String token, Boolean isConfirmed, Date createdAt) {}
