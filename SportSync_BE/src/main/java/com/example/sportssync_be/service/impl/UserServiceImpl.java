package com.example.sportssync_be.service.impl;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.entity.User;
import com.example.sportssync_be.mapper.UserMapper;
import com.example.sportssync_be.mapper.impl.UserMapperImpl;
import com.example.sportssync_be.repository.UserRepository;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userRepository.save(userMapper.dtoToEntity(userDTO));
        return userMapper.entityToDto(user);
    }

    @Override
    public UserDTO getUserByEmailAddressAndPassword(String emailAddress, String password) {
        User user = userRepository.findByEmailAddressAndPassword(emailAddress, password);
        return userMapper.entityToDto(user);
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return userMapper.entityToDto(user);
    }

    @Override
    public UserDTO getUserByEmailAddress(String emailAddress) {
        User user = userRepository.findByEmailAddress(emailAddress);
        return userMapper.entityToDto(user);
    }

    @Override
    public UserDTO getUserByToken(String token) {
        User user = userRepository.findByToken(token);
        return userMapper.entityToDto(user);
    }

    @Override
    public void updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id);

        if (existingUser != null) {
            existingUser.setUsername(userDTO.getUsername());
            existingUser.setFirstName(userDTO.getFirstName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setEmailAddress(userDTO.getEmailAddress());
            existingUser.setPassword(userDTO.getPassword());
            existingUser.setToken(userDTO.getToken());
            existingUser.setIsConfirmed(userDTO.getIsConfirmed());
            existingUser.setCreatedAt(userDTO.getCreatedAt());

            userRepository.save(existingUser);
        }
    }
}
