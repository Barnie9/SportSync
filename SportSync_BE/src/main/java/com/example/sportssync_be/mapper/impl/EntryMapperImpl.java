package com.example.sportssync_be.mapper.impl;

import com.example.sportssync_be.dto.EntryDTO;
import com.example.sportssync_be.entity.Entry;
import com.example.sportssync_be.mapper.EntryMapper;
import org.springframework.stereotype.Component;

@Component
public class EntryMapperImpl implements EntryMapper {
    @Override
    public EntryDTO entityToDto(Entry entry) {
        if (entry == null) {
            return null;
        }

        EntryDTO entryDTO = new EntryDTO();

        entryDTO.setId(entry.getId());

        entryDTO.setIdEvent(entry.getEvent().getId());
        entryDTO.setIdUser(entry.getUser().getId());

        return entryDTO;
    }

    @Override
    public Entry dtoToEntity(EntryDTO entryDTO) {
        if (entryDTO == null) {
            return null;
        }

        Entry entry = new Entry();

        entry.setId(entryDTO.getId());

        entry.getEvent().setId(entryDTO.getIdEvent());
        entry.getUser().setId(entryDTO.getIdUser());

        return entry;
    }
}
