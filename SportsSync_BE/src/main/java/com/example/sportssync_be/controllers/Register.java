package com.example.sportssync_be.controllers;

import com.example.sportssync_be.entities.Role;
import com.example.sportssync_be.entities.User;
import com.example.sportssync_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class Register {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public String showRegisterPage(Model model){
        model.addAttribute("registerForm",new User());
        System.out.println("A intrat!!! gett");

        return "register";
    }
    @PostMapping("/register")
    public String RegisterForm(@ModelAttribute User userForm,Model model){
        System.out.println("A intrat!!! in post");

        if(userRepository.findByUsername(userForm.getUsername()).isPresent()){
                model.addAttribute("usernameExists", true);
                model.addAttribute("registerForm",new User());
                System.out.println("A intrat!!!");
                return "register";
            }
            userForm.setRole(Role.USER);
            userRepository.save(userForm);
            System.out.println("Nu a intrat!");
            return "redirect:/login";
    }
}
