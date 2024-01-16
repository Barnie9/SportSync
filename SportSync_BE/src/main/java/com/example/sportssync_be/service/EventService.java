package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.mapper.EventMapper;
import com.example.sportssync_be.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventDto> getEventsByStartDate(LocalDate startDate) {
        return eventRepository.findByStartDate(startDate).stream().map(EventMapper::toDto).toList();
    }

    public EventDto getEventById(Long id) {
        return EventMapper.toDto(eventRepository.findById(id).orElseThrow());
    }

    public List<Event> getRecentEvents(){
        LocalDate today = LocalDate.now().minusDays(1);

        System.out.println("Today: " + today);

        List<Event> events = eventRepository.findByStartDateAfterOrderByStartDate(today);
        System.out.println("Number of Events Found: " + events.size());

        for(Event ev1 : events){
            System.out.println(ev1.toString());
            System.out.println("test111");
        }
        return events;

    }
}
