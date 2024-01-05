package com.example.sportssync_be.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventDto (Long id, UserDto organizer,String title, String description,LocalDate startDate, LocalTime startTime,LocalTime endTime, String location,String fieldType, Integer maxPlayers,Double price) {}
