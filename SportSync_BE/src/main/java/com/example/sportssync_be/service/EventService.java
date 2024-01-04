package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.EventDTO;

public interface EventService {
    EventDTO createEvent(EventDTO eventDTO);
    EventDTO getEventById(Long id);
    EventDTO deleteEventById(Long id);
    EventDTO updateEvent(Long id, EventDTO eventDTO);

}
