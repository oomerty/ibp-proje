package com.ratingapp.ratingapp.Rating;

import com.ratingapp.ratingapp.Event.Event;
import com.ratingapp.ratingapp.Event.EventService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private EventService eventService;

    @GetMapping("/upcoming-events")
    public List<Event> getUpcomingEvents() {
        return eventService.getUpcomingEvents();
    }

    @GetMapping("/events-all")
    public List<Event> getAllEvents() { return eventService.getAllEvents(); }

    @PostMapping("/rate/{eventId}")
    public ResponseEntity<String> rateEvent(@PathVariable Long eventId,
                                            HttpServletRequest request,
                                            @RequestBody String rating) {
        String ipAddress = getClientIp(request);
        String deviceIdentity = request.getHeader("User-Agent");

        if (ratingService.hasUserRatedEvent(ipAddress, eventId)) {
            return new ResponseEntity<>("Bu etkinliği zaten değerlendirdiniz.", HttpStatus.BAD_REQUEST);
        }

        ratingService.saveRating(ipAddress, deviceIdentity, rating, eventId);

        return new ResponseEntity<>("Değerlendirmeniz başarıyla alınmıştır!", HttpStatus.OK);
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

}
