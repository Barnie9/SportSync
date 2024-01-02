package com.example.sportssync_be.mapper;

import com.example.sportssync_be.dto.EntryDTO;
import com.example.sportssync_be.entity.Entry;

public interface EntryMapper {
    EntryDTO entityToDto(Entry entry);
    Entry dtoToEntity(EntryDTO entryDTO);
}
