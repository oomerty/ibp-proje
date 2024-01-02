package com.ratingapp.ratingapp.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getUpcomingEvents() {
        Date now = new Date();
        Date before = new Date(now.getTime() - TimeUnit.MINUTES.toMillis(3));
        return eventRepository.findByStartDateBeforeAndEndDateAfter(now, before);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

}
