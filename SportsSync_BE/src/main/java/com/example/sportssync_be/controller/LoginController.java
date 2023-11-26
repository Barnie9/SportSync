package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
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
