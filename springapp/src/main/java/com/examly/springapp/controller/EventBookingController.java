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


    //to not delete event
    @PutMapping("user/CancelEvent/{id}")
    private String cancelEvent(@PathVariable("id") Integer eventId, @RequestBody EventModel updatedEvent) {
        return eventService.cancelEvent(eventId, updatedEvent);
    }


    @GetMapping("user/viewEvent/{id}")
    public List<EventModel> viewEvents(@PathVariable("id") Integer userId) {
    return eventService.getEventList(userId);
    }

    @GetMapping("/admin/event")
    public List<EventModel> viewEvents() {
    return eventService.getEvent();
    }

    @GetMapping("user/event/{id}")
    public EventModel viewSingleEvents(@PathVariable("id") Integer eventId) {
    return eventService.getSingleEvent(eventId);
    }

}
