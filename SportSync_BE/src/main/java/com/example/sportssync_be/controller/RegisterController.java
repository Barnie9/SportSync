package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.utils.SendEmail;
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
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> body) {
        String errorMessages = "";
        boolean hasErrors = false;

        UserDTO foundUserByUsername = userService.getUserByUsername(body.get("username"));
        if (foundUserByUsername != null) {
            errorMessages += "present|";
            hasErrors = true;
        } else {
            errorMessages += "ok|";
        }

        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$";
        if (!body.get("emailAddress").matches(emailRegex)) {
            errorMessages += "invalid|";
            hasErrors = true;
        } else {
            UserDTO foundUserByEmailAddress = userService.getUserByEmailAddress(body.get("emailAddress"));
            if (foundUserByEmailAddress != null) {
                errorMessages += "present|";
                hasErrors = true;
            } else {
                errorMessages += "ok|";
            }
        }

        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        if (!body.get("password").matches(passwordRegex)) {
            errorMessages += "invalid";
            hasErrors = true;
        } else if (!body.get("password").equals(body.get("confirmPassword"))) {
            errorMessages += "notMatching";
            hasErrors = true;
        } else {
            errorMessages += "ok";
        }

        if (hasErrors) {
            return ResponseEntity.badRequest().body(errorMessages);
        }



        String token = RandomStringUtils.random(16, true, true);
        boolean isConfirmed = false;
        Date createdAt = new Date();

        UserDTO userDTO = new UserDTO();

        userDTO.setUsername(body.get("username"));
        userDTO.setFirstName(body.get("firstName"));
        userDTO.setLastName(body.get("lastName"));
        userDTO.setEmailAddress(body.get("emailAddress"));
        userDTO.setPassword(body.get("password"));
        userDTO.setGender(body.get("gender"));
        userDTO.setToken(token);
        userDTO.setIsConfirmed(isConfirmed);
        userDTO.setCreatedAt(createdAt);

        userService.createUser(userDTO);

        SendEmail.sendConfirmationEmail(body.get("emailAddress"), token);

        return ResponseEntity.ok().body("User created successfully");
    }
}
