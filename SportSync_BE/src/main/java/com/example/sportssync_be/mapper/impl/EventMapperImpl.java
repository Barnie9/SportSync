package com.example.sportssync_be.mapper.impl;

import com.example.sportssync_be.dto.EventDTO;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.mapper.EventMapper;
import org.springframework.stereotype.Component;

@Component
public class EventMapperImpl implements EventMapper {
    @Override
    public EventDTO entityToDto(Event event) {
        if (event == null) {
            return null;
        }

        EventDTO eventDTO = new EventDTO();

        eventDTO.setId(event.getId());

        eventDTO.setIdOrganizer(event.getOrganizer().getId());

        eventDTO.setTitle(event.getTitle());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setStartDate(event.getStartDate());
        eventDTO.setEndDate(event.getEndDate());
        eventDTO.setLocation(event.getLocation());
        eventDTO.setFieldType(event.getFieldType());
        eventDTO.setMaxPlayers(event.getMaxPlayers());
        eventDTO.setGender(event.getGender());
        eventDTO.setPrice(event.getPrice());

        return eventDTO;
    }

    @Override
    public Event dtoToEntity(EventDTO eventDTO) {
        if (eventDTO == null) {
            return null;
        }

        Event event = new Event();

        event.setId(eventDTO.getId());

        event.getOrganizer().setId(eventDTO.getIdOrganizer());

        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setStartDate(eventDTO.getStartDate());
        event.setEndDate(eventDTO.getEndDate());
        event.setLocation(eventDTO.getLocation());
        event.setFieldType(eventDTO.getFieldType());
        event.setMaxPlayers(eventDTO.getMaxPlayers());
        event.setGender(eventDTO.getGender());
        event.setPrice(eventDTO.getPrice());

        return event;
    }
}
