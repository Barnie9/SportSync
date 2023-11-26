package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestBody String token) {
        System.out.println(token);

        return ResponseEntity.ok().body("Email confirmed successfully");
    }
}
