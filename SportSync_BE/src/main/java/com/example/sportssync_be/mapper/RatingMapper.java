package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.RatingDTO;
import com.example.sportssync_be.entity.Rating;

public interface RatingMapper {
    RatingDTO entityToDto(Rating rating);
    Rating dtoToEntity(RatingDTO ratingDTO);
}
