package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.RatingDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.entity.User;
import com.example.sportssync_be.mapper.UserMapper;
import com.example.sportssync_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto createUser(UserDto userDto) {
        User savedUser = userRepository.save(UserMapper.toEntity(userDto));
        return UserMapper.toDto(savedUser);
    }

    public UserDto getUserByUsernameAndPassword(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return UserMapper.toDto(user);
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return UserMapper.toDto(user);
    }

    public UserDto getUserByEmailAddress(String emailAddress) {
        User user = userRepository.findByEmailAddress(emailAddress);
        return UserMapper.toDto(user);
    }

    public UserDto getUserByToken(String token) {
        User user = userRepository.findByToken(token);
        return UserMapper.toDto(user);
    }

    public void updateUser(Long id, UserDto userDto) {
        Optional<User> existingUser = userRepository.findById(id);

        if(existingUser.isPresent()) {
            existingUser.get().setUsername(userDto.username());
            existingUser.get().setEmailAddress(userDto.emailAddress());
            existingUser.get().setPassword(userDto.password());
            existingUser.get().setFirstName(userDto.firstName());
            existingUser.get().setLastName(userDto.lastName());
            existingUser.get().setBirthDate(userDto.birthDate());
            existingUser.get().setPhoneNumber(userDto.phoneNumber());
            existingUser.get().setFoot(userDto.foot());
            existingUser.get().setPosition(userDto.position());
            existingUser.get().setProfilePicturePath(userDto.profilePicturePath());
            existingUser.get().setToken(userDto.token());
            existingUser.get().setIsConfirmed(userDto.isConfirmed());
            existingUser.get().setCreatedAt(userDto.createdAt());

            userRepository.save(existingUser.get());
        }
    }

    public void updateUser1(String username, UserDto userDto) {
        System.out.println("userdto"+userDto);
        System.out.println("username"+username);
        Optional<User> existingUser = Optional.ofNullable(userRepository.findByUsername(username));
        System.out.println("test"+existingUser);
        if(existingUser.isPresent()) {
            existingUser.get().setUsername(userDto.username());
            existingUser.get().setEmailAddress(userDto.emailAddress());
            existingUser.get().setPassword(userDto.password());
            existingUser.get().setFirstName(userDto.firstName());
            existingUser.get().setLastName(userDto.lastName());
            existingUser.get().setBirthDate(userDto.birthDate());
            existingUser.get().setPhoneNumber(userDto.phoneNumber());
            existingUser.get().setFoot(userDto.foot());
            existingUser.get().setPosition(userDto.position());
            existingUser.get().setProfilePicturePath(userDto.profilePicturePath());
            userRepository.save(existingUser.get());
        }
    }
}
