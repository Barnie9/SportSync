package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.EntryDto;
import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.dto.UserDto;
import com.example.sportssync_be.mapper.EntryMapper;
import com.example.sportssync_be.repository.EntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final EntryRepository entryRepository;
    private final EventService eventService;
    private final UserService userService;

    public List<EntryDto> getEntriesByEventId(Long eventId) {
        return entryRepository.findByEventId(eventId).stream().map(EntryMapper::toDto).toList();
    }

    public void createEntry(String eventId, String username) {
        EventDto eventDto = eventService.getEventById(Long.parseLong(eventId));
        UserDto userDto = userService.getUserByUsername(username);

        EntryDto entryDto = new EntryDto(null, eventDto, userDto);
        entryRepository.save(EntryMapper.toEntity(entryDto));
    }
}
