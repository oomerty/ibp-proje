package com.ratingapp.ratingapp.Rating;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ratingapp.ratingapp.Event.Event;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)

public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ipAddress;
    private String deviceIdentity;
    private String rating;
    private Date ratingDate;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

}
