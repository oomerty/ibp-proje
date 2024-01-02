package com.ratingapp.ratingapp.Event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStartDateBeforeAndEndDateAfter(Date endDate, Date startDate);
}