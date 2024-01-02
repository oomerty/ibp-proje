package com.ratingapp.ratingapp.Rating;

import com.ratingapp.ratingapp.Event.Event;
import com.ratingapp.ratingapp.Event.EventRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;
    
    @Autowired
    private EventRepository eventRepository;

    @Transactional
    public void saveRating(String ipAddress, String deviceIdentity, String rating, Long eventId) {
        Rating newRating = new Rating();
        newRating.setIpAddress(ipAddress);
        newRating.setDeviceIdentity(deviceIdentity);
        newRating.setRating(rating);

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
        newRating.setEvent(event);

        ratingRepository.save(newRating);
    }

    public boolean hasUserRatedEvent(String ipAddress, Long eventId) {
        return ratingRepository.existsByIpAddressAndEventId(ipAddress, eventId);
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }


}
