package com.ratingapp.ratingapp.Admin;

import com.ratingapp.ratingapp.Event.Event;
import com.ratingapp.ratingapp.Event.EventService;
import com.ratingapp.ratingapp.Rating.Rating;
import com.ratingapp.ratingapp.Rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private EventService eventService;

    @GetMapping("/events/all")
    public List<Event> getAllEvents() { return eventService.getAllEvents(); }

    @GetMapping("/ratings/all")
    public List<Rating> getAllRatings() { return ratingService.getAllRatings(); }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String name, @RequestParam String password) {
        if (adminService.doesAdminExist(name, password)) {
            return new ResponseEntity<>("Giriş Başarılı", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Giriş Başarısız", HttpStatus.UNAUTHORIZED);
        }
    }
}
