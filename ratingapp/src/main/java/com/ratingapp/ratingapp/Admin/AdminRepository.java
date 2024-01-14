package com.ratingapp.ratingapp.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> existsByNameAndPassword(String name, String password);
}
