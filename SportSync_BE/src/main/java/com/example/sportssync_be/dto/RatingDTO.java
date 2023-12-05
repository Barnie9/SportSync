package com.example.sportssync_be.dto;

import lombok.Data;

@Data
public class RatingDTO {
    private Long id;

    // Relations
    private Long idEvent;
    private Long idRaterUser;
    private Long idRatedUser;

    // Stats
    private Integer pace;
    private Integer shooting;
    private Integer passing;
    private Integer dribbling;
    private Integer defending;
    private Integer physical;

    // Approval
    private Boolean isApproved;
}
