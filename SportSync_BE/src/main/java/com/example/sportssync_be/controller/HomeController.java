package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {

    private final UserService userService;

    @Autowired
    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{emailAddress}")
    public ResponseEntity<List<String>> getUser(@PathVariable String emailAddress) {
        UserDto userDto = userService.getUserByEmailAddress(emailAddress);

        if (userDto == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<String> body = new ArrayList<>();

        body.add(userDto.username());
        body.add(userDto.profilePicturePath());

        return ResponseEntity.ok().body(body);
    }
}
