package com.example.sportssync_be.repository;

import com.example.sportssync_be.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

        Rating findById(Long id);
}
