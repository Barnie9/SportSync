package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserDto(user.getId(), RatingMapper.toDto(user.getRating()), user.getUsername(), user.getEmailAddress(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getBirthDate(), user.getPhoneNumber(), user.getFoot(), user.getPosition(), user.getProfilePicturePath(), user.getToken(), user.getIsConfirmed(), user.getCreatedAt());
    }

    public static User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        return new User(userDto.id(), RatingMapper.toEntity(userDto.rating()), userDto.username(), userDto.emailAddress(), userDto.password(), userDto.firstName(), userDto.lastName(), userDto.birthDate(), userDto.phoneNumber(), userDto.foot(), userDto.position(), userDto.profilePicturePath(), userDto.token(), userDto.isConfirmed(), userDto.createdAt());
    }
}
