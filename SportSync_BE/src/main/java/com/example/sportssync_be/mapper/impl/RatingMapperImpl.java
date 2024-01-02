package com.example.sportssync_be.mapper.impl;

import com.example.sportssync_be.dto.RatingDTO;
import com.example.sportssync_be.entity.Rating;
import com.example.sportssync_be.mapper.RatingMapper;
import org.springframework.stereotype.Component;

@Component
public class RatingMapperImpl implements RatingMapper {
    @Override
    public RatingDTO entityToDto(Rating rating) {
        if (rating == null) {
            return null;
        }

        RatingDTO ratingDTO = new RatingDTO();

        ratingDTO.setId(rating.getId());

        ratingDTO.setIdEvent(rating.getEvent().getId());
        ratingDTO.setIdRaterUser(rating.getRaterUser().getId());
        ratingDTO.setIdRatedUser(rating.getRatedUser().getId());

        ratingDTO.setPace(rating.getPace());
        ratingDTO.setShooting(rating.getShooting());
        ratingDTO.setPassing(rating.getPassing());
        ratingDTO.setDribbling(rating.getDribbling());
        ratingDTO.setDefending(rating.getDefending());
        ratingDTO.setPhysical(rating.getPhysical());

        ratingDTO.setIsApproved(rating.getIsApproved());

        return ratingDTO;
    }

    @Override
    public Rating dtoToEntity(RatingDTO ratingDTO) {
        if (ratingDTO == null) {
            return null;
        }

        Rating rating = new Rating();

        rating.setId(ratingDTO.getId());

        rating.getEvent().setId(ratingDTO.getIdEvent());
        rating.getRaterUser().setId(ratingDTO.getIdRaterUser());
        rating.getRatedUser().setId(ratingDTO.getIdRatedUser());

        rating.setPace(ratingDTO.getPace());
        rating.setShooting(ratingDTO.getShooting());
        rating.setPassing(ratingDTO.getPassing());
        rating.setDribbling(ratingDTO.getDribbling());
        rating.setDefending(ratingDTO.getDefending());
        rating.setPhysical(ratingDTO.getPhysical());

        rating.setIsApproved(ratingDTO.getIsApproved());

        return rating;
    }
}
