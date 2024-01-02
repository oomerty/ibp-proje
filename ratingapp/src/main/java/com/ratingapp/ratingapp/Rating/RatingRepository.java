package com.ratingapp.ratingapp.Rating;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByIpAddressAndEventId(String ipAddress, Long eventId);
}