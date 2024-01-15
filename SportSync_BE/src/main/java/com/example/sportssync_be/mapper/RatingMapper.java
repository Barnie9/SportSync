package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.RatingDto;
import com.example.sportssync_be.entity.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {
    public static RatingDto toDto(Rating rating) {
        if (rating == null) {
            return null;
        }

        return new RatingDto(rating.getId(), rating.getPace(), rating.getShooting(), rating.getPassing(), rating.getDribbling(), rating.getDefending(), rating.getPhysical());
    }

    public static Rating toEntity(RatingDto ratingDto) {
        if (ratingDto == null) {
            return null;
        }

        return new Rating(ratingDto.id(), ratingDto.pace(), ratingDto.shooting(), ratingDto.passing(), ratingDto.dribbling(), ratingDto.defending(), ratingDto.physical());
    }
}
