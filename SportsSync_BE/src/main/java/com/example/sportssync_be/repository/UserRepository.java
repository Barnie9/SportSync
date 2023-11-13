package com.example.sportssync_be.repository;

import com.example.sportssync_be.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {


    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);



}
