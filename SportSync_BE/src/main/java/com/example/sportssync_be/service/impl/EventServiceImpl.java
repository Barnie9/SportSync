package com.example.sportssync_be.service.impl;

import com.example.sportssync_be.dto.EventDTO;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.mapper.EventMapper;
import com.example.sportssync_be.repository.EventRepository;
import com.example.sportssync_be.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = eventRepository.save(eventMapper.toEntity(eventDTO));
        return eventMapper.toDto(event);
    }

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id);
        return eventMapper.toDto(event);
    }
    public EventDTO deleteEventById(Long id) {
        Event event = eventRepository.findById(id);
        eventRepository.delete(event);
        return eventMapper.toDto(event);
    }
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event existingEvent = eventRepository.findById(id);

        if(existingEvent != null) {
            //existingEvent.getOrganizer().setId(eventDTO.getIdOrganizer());

            existingEvent.setTitle(eventDTO.getTitle());
            existingEvent.setDescription(eventDTO.getDescription());
            existingEvent.setStartDate(eventDTO.getStartDate());
            existingEvent.setEndDate(eventDTO.getEndDate());
            existingEvent.setLocation(eventDTO.getLocation());
            existingEvent.setFieldType(eventDTO.getFieldType());
            existingEvent.setMaxPlayers(eventDTO.getMaxPlayers());
            existingEvent.setGender(eventDTO.getGender());
            existingEvent.setPrice(eventDTO.getPrice());

            eventRepository.save(existingEvent);
        }
        return eventMapper.toDto(existingEvent);
    }

}
