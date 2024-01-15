package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.util.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> body) {
        if (userService.getUserByUsername(body.get("username")) == null) {
            return ResponseEntity.badRequest().body("* An account with this username does not exist");
        }

        UserDto userDto = userService.getUserByUsernameAndPassword(body.get("username"), body.get("password"));

        if (userDto == null) {
            return ResponseEntity.badRequest().body("* Wrong password");
        }

        if (!userDto.isConfirmed()) {
            return ResponseEntity.badRequest().body("* Email address not confirmed");
        }

        return ResponseEntity.ok().body(userDto.username());
    }
}
