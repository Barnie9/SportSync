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
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$";
        if (!user.get("emailAddress").matches(emailRegex)) {
            return ResponseEntity.badRequest().body("* Invalid email address");
        } else {
            UserDTO foundUserByEmailAddress = userService.getUserByEmailAddress(user.get("emailAddress"));
            if (foundUserByEmailAddress == null) {
                return ResponseEntity.badRequest().body("* An account with this email address does not exist");
            }
        }

        UserDTO userDTO = userService.getUserByEmailAddressAndPassword(user.get("emailAddress"), user.get("password"));

        if (userDTO == null) {
            return ResponseEntity.badRequest().body("* Wrong password");
        }

        if (!userDTO.isConfirmed()) {
            return ResponseEntity.badRequest().body("* Email address not confirmed");
        }

        return ResponseEntity.ok().body(userDTO.getEmailAddress());
    }
}
