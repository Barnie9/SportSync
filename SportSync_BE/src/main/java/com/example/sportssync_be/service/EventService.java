package com.example.sportssync_be.service;

import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;


    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
