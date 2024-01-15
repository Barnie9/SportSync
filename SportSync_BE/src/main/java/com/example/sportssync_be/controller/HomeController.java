package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.service.EntryService;
import com.example.sportssync_be.service.EventService;
import com.example.sportssync_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {

    private final UserService userService;
    private final EventService eventService;

    private final EntryService entryService;

    @Autowired
    public HomeController(UserService userService, EventService eventService, EntryService entryService) {
        this.userService = userService;
        this.eventService = eventService;
        this.entryService = entryService;
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
        System.out.println("Number of Events Foundasdsadaddsadsadad: " + popularEvents.size());


        return ResponseEntity.ok(popularEvents);
    }
}
