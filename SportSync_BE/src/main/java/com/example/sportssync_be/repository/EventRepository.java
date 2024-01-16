package com.example.sportssync_be.repository;

import com.example.sportssync_be.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStartDate(LocalDate startDate);

    List<Event> findByStartDateAfterOrderByStartDate(LocalDate date);

    List<Event> findByOrganizerId(Long userId);
}
