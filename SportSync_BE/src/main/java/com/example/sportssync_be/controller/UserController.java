package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.RatingDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.entity.Rating;
import com.example.sportssync_be.service.RatingService;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.util.UserUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController

public class UserController {

    private final UserService userService;
    private final UserUtil userUtil;
    private final RatingService ratingService;

    public UserController(UserService userService, UserUtil userUtil, RatingService ratingService) {
        this.userService = userService;
        this.userUtil = userUtil;
        this.ratingService = ratingService;
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<UserDto> getUser(@PathVariable String username) {
        UserDto userDto = userService.getUserByUsername(username);

        if (userDto == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping("/users/update")
    public ResponseEntity<String> updateUser(@RequestBody Map<String, String> body) {
        String errorMessages = userUtil.updateUser(body.get("username"), body.get("emailAddress"), body.get("password"), body.get("firstName"),body.get("lastName"),body.get("birthDate"),body.get("phoneNumber"),body.get("foot"),body.get("position"));
        System.out.println(errorMessages);
        if (!errorMessages.equals("ok,ok,ok,ok,ok,ok,ok")) {
            return ResponseEntity.badRequest().body(errorMessages);
        }
        LocalDate localDate1 = LocalDate.parse(body.get("birthDate"));
        UserDto userDTO = new UserDto(null,null, body.get("username"), body.get("emailAddress"), body.get("password"), body.get("firstName"), body.get("lastName"),localDate1, body.get("phoneNumber"), body.get("foot"), body.get("position"),null,null,null,null);
        userService.updateUser1(userDTO.username(), userDTO);
        return ResponseEntity.ok().body("User updated successfully");
    }

    @GetMapping("/users/stats/{username}")
    public ResponseEntity<RatingDto> getUserStats(@PathVariable String username) {
        UserDto userDto = userService.getUserByUsername(username);
        if (userDto == null) {
            return ResponseEntity.badRequest().body(null);
        }
        RatingDto rating = ratingService.getRatingById(userDto.rating().id());

        return ResponseEntity.ok().body(rating);
    }
}
