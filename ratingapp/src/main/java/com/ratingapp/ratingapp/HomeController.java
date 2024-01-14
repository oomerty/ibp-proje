package com.ratingapp.ratingapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/event")
    public String generatePage(Model model, @RequestParam(name = "eventID", defaultValue = "1") int eventID) {
        model.addAttribute("eventIDS", eventID);
        model.addAttribute("pageTitle", "Generated Page");

        return "single-event";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

}
