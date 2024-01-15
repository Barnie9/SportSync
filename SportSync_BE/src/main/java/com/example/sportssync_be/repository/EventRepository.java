package com.example.sportssync_be.repository;

import com.example.sportssync_be.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {


    List<Event> findByStartDateAfterOrderByStartDate(LocalDate date);


}
