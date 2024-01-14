package com.ratingapp.ratingapp.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId).orElse(null);
    }

    public boolean doesAdminExist(String name, String password) {
        Optional<Admin> admin = adminRepository.existsByNameAndPassword(name, password);
        return admin.isPresent();
    }

}
