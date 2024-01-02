package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByEmailAddressAndPassword(String emailAddress, String password);
    UserDTO getUserByUsername(String username);
    UserDTO getUserByEmailAddress(String emailAddress);
    UserDTO getUserByToken(String token);
    void updateUser(Long id, UserDTO userDTO);
}
