package com.example.sportssync_be.repository;

import com.example.sportssync_be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsernameAndPassword(String emailAddress, String password);
    User findByUsername(String username);
    User findByEmailAddress(String emailAddress);
    User findByToken(String token);
}
