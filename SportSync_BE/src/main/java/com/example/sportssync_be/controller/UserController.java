package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.util.UserUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Locale;
import java.util.Map;

@RestController

public class UserController {

    private final UserService userService;
    private final UserUtil userUtil;

    public UserController(UserService userService, UserUtil userUtil) {
        this.userService = userService;
        this.userUtil = userUtil;
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
        if (!errorMessages.equals("ok,ok,ok,ok,ok,ok")) {
            return ResponseEntity.badRequest().body(errorMessages);
        }
        LocalDate localDate1 = LocalDate.now();
        UserDto userDTO = new UserDto(null, null,body.get("username"), body.get("emailAddress"), body.get("password"), body.get("firstName"), body.get("lastName"),  localDate1,null , body.get("phoneNumber"), body.get("foot"), body.get("position"),null,null,null);
        userService.updateUser1(body.get("username"), userDTO);
        return ResponseEntity.ok().body("User updated successfully");
    }
}
