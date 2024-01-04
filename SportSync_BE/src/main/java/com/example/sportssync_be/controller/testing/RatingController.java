package com.example.sportssync_be.controller.testing;

import com.example.sportssync_be.dto.EventDTO;
import com.example.sportssync_be.dto.RatingDTO;
import com.example.sportssync_be.entity.Rating;
import com.example.sportssync_be.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class RatingController {
    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/ratings")
    public ResponseEntity<RatingDTO> createRating(@RequestBody RatingDTO ratingDTO) {
        return new ResponseEntity<>(ratingService.createRating(ratingDTO), HttpStatus.OK);
    }
    @GetMapping("/ratings/{id}")
    public ResponseEntity<RatingDTO> getRatingById(@PathVariable Long id) {
        return new ResponseEntity<>(ratingService.getRatingById(id), HttpStatus.OK);
    }

    @PostMapping("/ratings/{id}")
    public ResponseEntity<RatingDTO> updateRating(@PathVariable Long id, @RequestBody RatingDTO ratingDTO) {
        return new ResponseEntity<>(ratingService.updateRating(id, ratingDTO), HttpStatus.OK);
    }

    @DeleteMapping("/ratings/{id}")
    public ResponseEntity<RatingDTO> deleteRatingById(@PathVariable Long id) {
        return new ResponseEntity<>(ratingService.deleteRatingById(id), HttpStatus.OK);
    }
}
