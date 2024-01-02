package com.example.sportssync_be.service.impl;

import com.example.sportssync_be.dto.RatingDTO;
import com.example.sportssync_be.entity.Rating;
import com.example.sportssync_be.mapper.RatingMapper;
import com.example.sportssync_be.repository.RatingRepository;
import com.example.sportssync_be.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository, RatingMapper ratingMapper) {
        this.ratingRepository = ratingRepository;
        this.ratingMapper = ratingMapper;
    }

    @Override
    public RatingDTO createRating(RatingDTO ratingDTO) {
        Rating rating = ratingRepository.save(ratingMapper.toEntity(ratingDTO));
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingDTO getRatingById(Long id) {
        Rating rating = ratingRepository.findById(id);
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingDTO deleteRatingById(Long id) {
        Rating rating = ratingRepository.findById(id);
        ratingRepository.delete(rating);
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingDTO updateRating(Long id, RatingDTO ratingDTO) {
        Rating existingRating = ratingRepository.findById(id);

        if(existingRating != null) {

//            existingRating.getEvent().setId(ratingDTO.getIdEvent());
//            existingRating.getRaterUser().setId(ratingDTO.getIdRaterUser());
//            existingRating.getRatedUser().setId(ratingDTO.getIdRatedUser());

            existingRating.setPace(ratingDTO.getPace());
            existingRating.setShooting(ratingDTO.getShooting());
            existingRating.setPassing(ratingDTO.getPassing());
            existingRating.setDribbling(ratingDTO.getDribbling());
            existingRating.setDefending(ratingDTO.getDefending());
            existingRating.setPhysical(ratingDTO.getPhysical());
            existingRating.setIsApproved(ratingDTO.getIsApproved());
            ratingRepository.save(existingRating);
        }
        return ratingMapper.toDto(existingRating);
    }

}
