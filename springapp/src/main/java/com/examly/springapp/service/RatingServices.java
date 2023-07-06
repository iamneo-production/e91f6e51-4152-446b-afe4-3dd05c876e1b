package com.examly.springapp.service;

import com.examly.springapp.models.EventModel;
import com.examly.springapp.repository.EventModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServices {
    @Autowired
    private EventModelRepository eventModelRepository;

    public String rateEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {

            event.setRating(updatedEvent.getRating());
            event.setRating_Discription(updatedEvent.getRating_Discription());

            eventModelRepository.save(event);
            return "Rating Updated";
        } else {
            return "Event not found";
        }
    }
    
}
