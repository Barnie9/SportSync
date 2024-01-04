package com.example.sportssync_be.mapper.impl;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.entity.User;
import com.example.sportssync_be.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {
    public UserDTO toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );

        userDTO.setUsername( user.getUsername() );
        userDTO.setEmailAddress( user.getEmailAddress() );
        userDTO.setPassword( user.getPassword() );

        userDTO.setFirstName( user.getFirstName() );
        userDTO.setLastName( user.getLastName() );
        userDTO.setGender( user.getGender() );
        userDTO.setProfilePicturePath( user.getProfilePicturePath() );

        userDTO.setToken( user.getToken() );
        userDTO.setIsConfirmed( user.getIsConfirmed() );
        userDTO.setCreatedAt( user.getCreatedAt() );

        return userDTO;
    }

    public User toEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );

        user.setUsername( userDTO.getUsername() );
        user.setEmailAddress( userDTO.getEmailAddress() );
        user.setPassword( userDTO.getPassword() );

        user.setFirstName( userDTO.getFirstName() );
        user.setLastName( userDTO.getLastName() );
        user.setGender( userDTO.getGender() );
        user.setProfilePicturePath( userDTO.getProfilePicturePath() );

        user.setToken( userDTO.getToken() );
        user.setIsConfirmed( userDTO.getIsConfirmed() );
        user.setCreatedAt( userDTO.getCreatedAt() );

        return user;
    }
}
