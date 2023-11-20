package com.example.sportssync_be.controllers;

import com.example.sportssync_be.entities.User;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Login {
    private final UserService userService;
    @Autowired
    public Login(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @PostMapping("/login")
    public String loginPost(@RequestParam String username, @RequestParam String password){
        if (userService.isValidUser(username, password)) {
            return "redirect:/";
        } else {
            return "redirect:/login?error=true";
        }
    }



}
