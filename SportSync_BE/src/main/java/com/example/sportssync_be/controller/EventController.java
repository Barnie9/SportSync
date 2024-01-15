package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    @GetMapping("/startDate={startDate}")
    public ResponseEntity<List<EventDto>> getEventsByStartDate(@PathVariable("startDate") String startDate) {
        return ResponseEntity.ok().body(eventService.getEventsByStartDate(LocalDate.parse(startDate)));
    }

    @GetMapping("/id={id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(eventService.getEventById(id));
    }

}
