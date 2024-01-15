package com.example.sportssync_be.repository;

import com.example.sportssync_be.entity.Entry;
import com.example.sportssync_be.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByEventId(Long eventId);

    @Query("SELECT e.event " +
            "FROM Entry e " +
            "GROUP BY e.event " +
            "ORDER BY COUNT(e.user) DESC")
    List<Event> findEventsOrderedByUserCount(Pageable pageable);
}
