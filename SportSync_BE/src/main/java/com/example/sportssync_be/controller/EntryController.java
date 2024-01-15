package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.EntryDto;
import com.example.sportssync_be.service.EntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/entries")
public class EntryController {

    private final EntryService entryService;

    @GetMapping("/eventId={eventId}")
    private ResponseEntity<List<EntryDto>> getEntriesByEventId(@PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok().body(entryService.getEntriesByEventId(eventId));
    }

    @PostMapping()
    private ResponseEntity<String> createEntry(@RequestBody Map<String, String> body) {
        entryService.createEntry(body.get("eventId"), body.get("username"));
        return ResponseEntity.ok().body("Entry created successfully");
    }

}
