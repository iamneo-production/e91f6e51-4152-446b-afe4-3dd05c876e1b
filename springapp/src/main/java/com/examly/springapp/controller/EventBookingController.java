package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.beans.factory.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventBookingController {
    @Autowired
    private EventModelServices eventService;

    @PostMapping("user/addEvent")
    public String saveNewEvent(@RequestBody EventModel eventModel) {
        eventService.addEvent(eventModel);
        return "Event added";
    }

    @DeleteMapping("user/deleteEvent/{id}")
    private String deleteEvent(@PathVariable("id") Integer eventId) {
        return eventService.deleteEvent(eventId);
    }

    @PutMapping("user/editEvent/{id}")
    private String editEvent(@PathVariable("id") Integer eventId, @RequestBody EventModel updatedEvent) {
        return eventService.editEvent(eventId, updatedEvent);
    }

    @GetMapping("user/viewEvent")
    public List<EventModel> viewEvents() {
        return eventService.getEventList();
    }
}
