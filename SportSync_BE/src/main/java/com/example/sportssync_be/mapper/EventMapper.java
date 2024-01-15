package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {
    public static EventDto toDto(Event event) {
        if (event == null) {
            return null;
        }

        return new EventDto(event.getId(), UserMapper.toDto(event.getOrganizer()), event.getTitle(), event.getDescription(), event.getStartDate(), event.getStartTime(), event.getEndTime(), event.getLocation(), event.getFieldType(), event.getMaxPlayers(), event.getPrice());
    }

    public static Event toEntity(EventDto eventDto) {
        if (eventDto == null) {
            return null;
        }

        return new Event(eventDto.id(), UserMapper.toEntity(eventDto.organizer()), eventDto.title(), eventDto.description(), eventDto.startDate(), eventDto.startTime(), eventDto.endTime(), eventDto.location(), eventDto.fieldType(), eventDto.maxPlayers(), eventDto.price());
    }
}
