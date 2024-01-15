package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.UserService;
import com.example.sportssync_be.util.SendEmail;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EmailConfirmationController {

    private final UserService userService;

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

    @PostMapping("/generate-new-email-confirmation-token")
    public ResponseEntity<String> generateNewEmailConfirmationToken(@RequestBody Map<String, String> body) {
        UserDto userDto = userService.getUserByToken(body.get("token"));

        String token = RandomStringUtils.random(16, true, true);
        Date createdAt = new Date();

        UserDto updatedUserDTO = new UserDto(userDto.id(), userDto.rating(), userDto.username(), userDto.emailAddress(), userDto.password(), userDto.firstName(), userDto.lastName(), userDto.birthDate(), userDto.phoneNumber(), userDto.foot(), userDto.position(), userDto.profilePicturePath(), token, false, createdAt);

        userService.updateUser(updatedUserDTO.id(), updatedUserDTO);

        SendEmail.sendConfirmationEmail(updatedUserDTO.emailAddress(), token);

        return ResponseEntity.ok().body("New email confirmation token generated successfully");
    }
}
