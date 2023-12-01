package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.UserDTO;
import com.example.sportssync_be.entity.User;

public interface UserMapper {
    UserDTO entityToDto(User user);
    User dtoToEntity(UserDTO userDTO);
}
