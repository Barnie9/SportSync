package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        UserDTO foundUserByUsername = userService.getUserByUsername(user.get("username"));
        if (foundUserByUsername != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        UserDTO foundUserByEmailAddress = userService.getUserByEmailAddress(user.get("emailAddress"));
        if (foundUserByEmailAddress != null) {
            return ResponseEntity.badRequest().body("Email address already exists");
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setUsername(user.get("username"));
        userDTO.setFirstName(user.get("firstName"));
        userDTO.setLastName(user.get("lastName"));
        userDTO.setEmailAddress(user.get("emailAddress"));
        userDTO.setPassword(user.get("password"));

        userService.createUser(userDTO);

        return ResponseEntity.ok().body("User created successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> user) {
        UserDTO userDTO = userService.getUserByEmailAddressAndPassword(user.get("emailAddress"), user.get("password"));

        if (userDTO == null) {
            return ResponseEntity.badRequest().body("Invalid email address or password");
        }

        return ResponseEntity.ok().body(userDTO.getEmailAddress());
    }
}
