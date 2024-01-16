package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.service.EntryService;
import com.example.sportssync_be.service.EventService;
import com.example.sportssync_be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final EntryService entryService;
    private final UserService userService;

    @GetMapping("/startDate={startDate}")
    public ResponseEntity<List<EventDto>> getEventsByStartDate(@PathVariable("startDate") String startDate) {
        return ResponseEntity.ok().body(eventService.getEventsByStartDate(LocalDate.parse(startDate)));
    }

    @GetMapping("/id={id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(eventService.getEventById(id));
    }

    @GetMapping("/api/recentevents")
    public ResponseEntity<List<Event>> getRecentEvents(){
        List<Event> recentEvents = eventService.getRecentEvents();
        return ResponseEntity.ok(recentEvents);
    }

    @GetMapping("/api/popularevents")
    public ResponseEntity<List<Event>> getPopularEvents() {
        Pageable pageable = PageRequest.of(0, 10);

        List<Event> popularEvents = entryService.findAllEventsOrderedByUserCount(pageable);

        return ResponseEntity.ok(popularEvents);
    }

    @GetMapping("/createdBy={username}")
    public ResponseEntity<List<EventDto>> getEventsByCreatedBy(@PathVariable("username") String username) {
        UserDto userDto = userService.getUserByUsername(username);

        return ResponseEntity.ok().body(eventService.getEventsByCreatedBy(userDto.id()));
    }

    @PostMapping()
    public ResponseEntity<String> createEvent(@RequestBody EventDto eventDto) {
        eventService.createEvent(eventDto);
        return ResponseEntity.ok().body("Event created successfully");
    }

}
