package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.RatingDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.RatingService;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.util.SendEmail;
import com.example.sportssync_be.util.UserUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RegisterController {

    private final UserService userService;
    private final UserUtil userUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> body) {
        String errorMessages = userUtil.validateUser(body.get("username"), body.get("emailAddress"), body.get("password"), body.get("confirmPassword"));

        if (!errorMessages.equals("ok,ok,ok")) {
            return ResponseEntity.badRequest().body(errorMessages);
        }



        String token = RandomStringUtils.random(16, true, true);
        boolean isConfirmed = false;
        Date createdAt = new Date();

        RatingDto ratingDto = new RatingDto(null, 0, 0, 0, 0, 0, 0);

        UserDto userDTO = new UserDto(null, ratingDto, body.get("username"), body.get("emailAddress"), body.get("password"), null, null, null, null, null, null, null, token, isConfirmed, createdAt);

        userService.createUser(userDTO);

        SendEmail.sendConfirmationEmail(userDTO.emailAddress(), token);

        return ResponseEntity.ok().body("User created successfully");
    }
}
