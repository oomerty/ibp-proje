package com.ratingapp.ratingapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return  "index";
    }

    // @GetMapping("/event")
    // public String singleEvent() {
    //     return  "single-event";
    // }

    @GetMapping("/event")
    public String generatePage(Model model, @RequestParam(name = "eventID", defaultValue = "1") int eventID) {
        // Sayfa numarasını Thymeleaf template'e geçir
        model.addAttribute("eventIDS", eventID);

        // Diğer gerekli verileri modele ekleyebilirsiniz
        model.addAttribute("pageTitle", "Generated Page");

        return "single-event";
    }

}
