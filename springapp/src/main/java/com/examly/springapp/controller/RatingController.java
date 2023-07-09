package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import org.springframework.beans.factory.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RatingController {
    @Autowired
    private RatingServices ratingService;

    @PutMapping("user/rating/{id}")
    private String rating(@PathVariable("id") Integer eventId, @RequestBody EventModel updatedEvent) {
        return ratingService.rateEvent(eventId, updatedEvent);
    }
}
