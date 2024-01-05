package com.example.sportssync_be.util;

import com.example.sportssync_be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserUtil {

    private final UserService userService;

    public boolean isUsernameUnique(String username) {
        return userService.getUserByUsername(username) == null;
    }

    public boolean isEmailAddressUnique(String emailAddress) {
        return userService.getUserByEmailAddress(emailAddress) == null;
    }

    public boolean isUsernameValid(String username) {
        return username.matches("^[a-zA-Z0-9_]{3,}$");
    }

    public boolean isEmailAddressValid(String emailAddress) {
        return emailAddress.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$");
    }

    public boolean isPasswordValid(String password) {
        return password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    }

    public boolean isPasswordMatching(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }

    public String validateUser(String username, String emailAddress, String password, String confirmPassword) {
        String errorMessages = "";

        if (!isUsernameValid(username)) {
            errorMessages += "invalid,";
        } else if (!isUsernameUnique(username)) {
            errorMessages += "present,";
        } else {
            errorMessages += "ok,";
        }

        if (!isEmailAddressValid(emailAddress)) {
            errorMessages += "invalid,";
        } else if (!isEmailAddressUnique(emailAddress)) {
            errorMessages += "present,";
        } else {
            errorMessages += "ok,";
        }

        if (!isPasswordValid(password)) {
            errorMessages += "invalid";
        } else if (!isPasswordMatching(password, confirmPassword)) {
            errorMessages += "mismatch";
        } else {
            errorMessages += "ok";
        }

        return errorMessages;
    }
}
