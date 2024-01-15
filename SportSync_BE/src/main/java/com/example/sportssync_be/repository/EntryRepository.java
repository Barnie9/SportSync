package com.example.sportssync_be.repository;

import com.example.sportssync_be.dto.EntryDto;
import com.example.sportssync_be.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByEventId(Long eventId);
}
