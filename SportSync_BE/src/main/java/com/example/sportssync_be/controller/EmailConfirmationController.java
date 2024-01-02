package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.utils.SendEmail;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
public class EmailConfirmationController {
    private final UserService userService;

    @Autowired
    public EmailConfirmationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestBody Map<String, String> body) {
        UserDTO userDTO = userService.getUserByToken(body.get("token"));

        if (userDTO == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (userDTO.getIsConfirmed()) {
            return ResponseEntity.badRequest().body("Email already confirmed");
        }

        // 21600000 milliseconds = 6 hours
        if (new Date().getTime() - userDTO.getCreatedAt().getTime() > 21600000) {
            return ResponseEntity.badRequest().body("Expired token");
        }

        userDTO.setIsConfirmed(true);

        userService.updateUser(userDTO.getId(), userDTO);

        return ResponseEntity.ok().body("Email confirmed successfully");
    }

    @PostMapping("/generate-new-email-confirmation-token")
    public ResponseEntity<String> generateNewEmailConfirmationToken(@RequestBody Map<String, String> body) {
        UserDTO userDTO = userService.getUserByToken(body.get("token"));

        String token = RandomStringUtils.random(16, true, true);
        Date createdAt = new Date();

        userDTO.setToken(token);
        userDTO.setCreatedAt(createdAt);

        userService.updateUser(userDTO.getId(), userDTO);

        SendEmail.sendConfirmationEmail(userDTO.getEmailAddress(), token);

        return ResponseEntity.ok().body("New email confirmation token generated successfully");
    }
}
