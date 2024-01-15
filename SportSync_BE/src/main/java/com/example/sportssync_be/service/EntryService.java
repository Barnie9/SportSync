package com.example.sportssync_be.service;

import com.example.sportssync_be.dto.EventDto;
import com.example.sportssync_be.entity.Event;
import com.example.sportssync_be.mapper.EventMapper;
import com.example.sportssync_be.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntryService {
    @Autowired
    private EntryRepository entryRepository;

    public List<Event> findAllEventsOrderedByUserCount(Pageable pageable) {
        return entryRepository.findEventsOrderedByUserCount(pageable);
    }

}
