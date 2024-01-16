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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserUtil userUtil;
    private final RatingService ratingService;

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

    @PostMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestBody Map<String, String> body) {
        UserDto userDto = userService.getUserByToken(body.get("token"));

        if (userDto == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (userDto.isConfirmed()) {
            return ResponseEntity.badRequest().body("Email already confirmed");
        }

        // 21600000 milliseconds = 6 hours
        if (new Date().getTime() - userDto.createdAt().getTime() > 21600000) {
            return ResponseEntity.badRequest().body("Expired token");
        }

        UserDto updatedUserDTO = new UserDto(userDto.id(), userDto.rating(), userDto.username(), userDto.emailAddress(), userDto.password(), userDto.firstName(), userDto.lastName(), userDto.birthDate(), userDto.phoneNumber(), userDto.foot(), userDto.position(), userDto.profilePicturePath(), userDto.token(), true, userDto.createdAt());

        userService.updateUser(updatedUserDTO.id(), updatedUserDTO);

        return ResponseEntity.ok().body("Email confirmed successfully");
    }

    @PostMapping("/generate-new-token")
    public ResponseEntity<String> generateNewEmailConfirmationToken(@RequestBody Map<String, String> body) {
        UserDto userDto = userService.getUserByToken(body.get("token"));

        String token = RandomStringUtils.random(16, true, true);
        Date createdAt = new Date();

        UserDto updatedUserDTO = new UserDto(userDto.id(), userDto.rating(), userDto.username(), userDto.emailAddress(), userDto.password(), userDto.firstName(), userDto.lastName(), userDto.birthDate(), userDto.phoneNumber(), userDto.foot(), userDto.position(), userDto.profilePicturePath(), token, false, createdAt);

        userService.updateUser(updatedUserDTO.id(), updatedUserDTO);

        SendEmail.sendConfirmationEmail(updatedUserDTO.emailAddress(), token);

        return ResponseEntity.ok().body("New email confirmation token generated successfully");
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto userDto = userService.getUserByUsername(username);

        if (userDto == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody Map<String, String> body) {
        String errorMessages = userUtil.updateUser(body.get("username"), body.get("emailAddress"), body.get("password"), body.get("firstName"),body.get("lastName"),body.get("birthDate"),body.get("phoneNumber"),body.get("foot"),body.get("position"));

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
