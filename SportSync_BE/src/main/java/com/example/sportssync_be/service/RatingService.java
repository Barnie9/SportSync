package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.RatingDTO;

public interface RatingService {
    RatingDTO createRating(RatingDTO ratingDTO);
    RatingDTO getRatingById(Long id);
    RatingDTO deleteRatingById(Long id);
    RatingDTO updateRating(Long id, RatingDTO ratingDTO);

}
