package com.example.sportssync_be.service;

import com.example.sportssync_be.entities.User;
import com.example.sportssync_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService  {

    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isValidUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsernameAndPassword(username, password);
        return userOptional.isPresent();
    }
}
