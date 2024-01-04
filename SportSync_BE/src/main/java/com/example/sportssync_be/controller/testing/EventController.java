package com.example.sportssync_be.controller.testing;


import com.example.sportssync_be.dto.EventDTO;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/events")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.createEvent(eventDTO), HttpStatus.CREATED);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        return new ResponseEntity<>(eventService.getEventById(id), HttpStatus.OK);
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<EventDTO> deleteEventById(@PathVariable Long id) {
       return new ResponseEntity<>(eventService.deleteEventById(id), HttpStatus.OK);
    }

    @PostMapping("/events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.updateEvent(id, eventDTO), HttpStatus.OK);
    }
}
