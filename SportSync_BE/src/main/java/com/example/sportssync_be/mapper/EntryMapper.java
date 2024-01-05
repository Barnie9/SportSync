package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.EntryDto;
import com.example.sportssync_be.entity.Entry;
import org.springframework.stereotype.Component;

@Component
public class EntryMapper {
    public static EntryDto toDto(Entry entry) {
        if (entry == null) {
            return null;
        }

        return new EntryDto(entry.getId(), EventMapper.toDto(entry.getEvent()), UserMapper.toDto(entry.getUser()));
    }

    public static Entry toEntity(EntryDto entryDto) {
        if (entryDto == null) {
            return null;
        }

        return new Entry(entryDto.id(), EventMapper.toEntity(entryDto.event()), UserMapper.toEntity(entryDto.user()));
    }
}
