package com.example.sportssync_be.controller;

import com.example.sportssync_be.dto.EntryDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.service.EntryService;
import com.example.sportssync_be.service.UserService;
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
    private final UserService userService;

    @GetMapping("/eventId={eventId}")
    private ResponseEntity<List<EntryDto>> getEntriesByEventId(@PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok().body(entryService.getEntriesByEventId(eventId));
    }

    @PostMapping()
    private ResponseEntity<String> createEntry(@RequestBody Map<String, String> body) {
        entryService.createEntry(body.get("eventId"), body.get("username"));
        return ResponseEntity.ok().body("Entry created successfully");
    }

    @GetMapping("/username={username}")
    private ResponseEntity<List<EntryDto>> getEntriesByUsername(@PathVariable("username") String username) {
        UserDto userDto = userService.getUserByUsername(username);

        return ResponseEntity.ok().body(entryService.getEntriesByUsername(userDto.id()));
    }

    @DeleteMapping("/eventId={eventId}&username={username}")
    private ResponseEntity<String> deleteEntry(@PathVariable("eventId") Long eventId, @PathVariable("username") String username) {
        UserDto userDto = userService.getUserByUsername(username);
        entryService.deleteEntry(eventId, userDto.id());
        return ResponseEntity.ok().body("Entry deleted successfully");
    }
}
