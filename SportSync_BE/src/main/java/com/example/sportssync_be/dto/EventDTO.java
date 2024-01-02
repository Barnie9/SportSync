package com.example.sportssync_be.dto;

import lombok.Data;

import java.util.Date;

@Data
public class EventDTO {
    private Long id;

    // Relations
    private Long idOrganizer;

    // Details
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private String location;
    private String fieldType;
    private Integer maxPlayers;
    private String gender;
    private Double price;
}
