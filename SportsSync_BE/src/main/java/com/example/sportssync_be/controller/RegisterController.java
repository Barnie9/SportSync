package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
public class RegisterController {

    private final UserService userService;

    @Autowired
    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> user) {
        String errorMessages = "";

        UserDTO foundUserByUsername = userService.getUserByUsername(user.get("username"));
        if (foundUserByUsername != null) {
            errorMessages += "* Username already exists|";
        }

        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$";
        if (!user.get("emailAddress").matches(emailRegex)) {
            errorMessages += "* Invalid email address|";
        } else {
            UserDTO foundUserByEmailAddress = userService.getUserByEmailAddress(user.get("emailAddress"));
            if (foundUserByEmailAddress != null) {
                errorMessages += "* Email address already exists|";
            }
        }

        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        if (!user.get("password").matches(passwordRegex)) {
            errorMessages += "* Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number|";
        } else if (!user.get("password").equals(user.get("confirmPassword"))) {
            errorMessages += "* Passwords do not match|";
        }

        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(errorMessages);
        }



        String token = RandomStringUtils.random(16, true, true);
        boolean isConfirmed = false;
        Date createdAt = new Date();

        UserDTO userDTO = new UserDTO();

        userDTO.setUsername(user.get("username"));
        userDTO.setFirstName(user.get("firstName"));
        userDTO.setLastName(user.get("lastName"));
        userDTO.setEmailAddress(user.get("emailAddress"));
        userDTO.setPassword(user.get("password"));
        userDTO.setToken(token);
        userDTO.setConfirmed(isConfirmed);
        userDTO.setCreatedAt(createdAt);

        userService.createUser(userDTO);

        return ResponseEntity.ok().body("User created successfully");
    }

    @PostMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestBody Map<String, String> user) {
//        System.out.println(user.get("token"));

        UserDTO userDTO = userService.getUserByToken(user.get("token"));

        if (userDTO == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (userDTO.isConfirmed()) {
            return ResponseEntity.badRequest().body("Email already confirmed");
        }

        // 21600000 milliseconds = 6 hours
        if (new Date().getTime() - userDTO.getCreatedAt().getTime() > 21600000) {
            return ResponseEntity.badRequest().body("Expired token");
        }

        userDTO.setConfirmed(true);

        userService.updateUser(userDTO.getId(), userDTO);

        return ResponseEntity.ok().body("Email confirmed successfully");
    }

    @PostMapping("/generate-new-email-confirmation-token")
    public ResponseEntity<String> generateNewEmailConfirmationToken(@RequestBody Map<String, String> user) {
        UserDTO userDTO = userService.getUserByToken(user.get("token"));

        String token = RandomStringUtils.random(16, true, true);
        Date createdAt = new Date();

        userDTO.setToken(token);
        userDTO.setCreatedAt(createdAt);

        userService.updateUser(userDTO.getId(), userDTO);

        return ResponseEntity.ok().body("New email confirmation token generated successfully");
    }
}
