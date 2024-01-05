package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.RatingDto;
import com.example.sportssync_be.entity.Rating;
import com.example.sportssync_be.mapper.RatingMapper;
import com.example.sportssync_be.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public void updateRating(Long id, RatingDto ratingDto) {
        Optional<Rating> existingRating = ratingRepository.findById(id);

        if(existingRating.isPresent()) {
            existingRating.get().setPace(ratingDto.pace());
            existingRating.get().setShooting(ratingDto.shooting());
            existingRating.get().setPassing(ratingDto.passing());
            existingRating.get().setDribbling(ratingDto.dribbling());
            existingRating.get().setDefending(ratingDto.defending());
            existingRating.get().setPhysical(ratingDto.physical());

            ratingRepository.save(existingRating.get());
        }
    }

}
