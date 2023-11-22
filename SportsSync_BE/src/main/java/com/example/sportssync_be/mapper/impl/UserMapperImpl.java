package com.example.sportssync_be.mapper.impl;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.entity.User;
import com.example.sportssync_be.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {
    public UserDTO entityToDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setUsername( user.getUsername() );
        userDTO.setFirstName( user.getFirstName() );
        userDTO.setLastName( user.getLastName() );
        userDTO.setEmailAddress( user.getEmailAddress() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setProfilePicture( user.getProfilePicture() );
        userDTO.setGender( user.getGender() );

        return userDTO;
    }

    public User dtoToEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );
        user.setUsername( userDTO.getUsername() );
        user.setFirstName( userDTO.getFirstName() );
        user.setLastName( userDTO.getLastName() );
        user.setEmailAddress( userDTO.getEmailAddress() );
        user.setPassword( userDTO.getPassword() );
        user.setProfilePicture( userDTO.getProfilePicture() );
        user.setGender( userDTO.getGender() );

        return user;
    }
}
