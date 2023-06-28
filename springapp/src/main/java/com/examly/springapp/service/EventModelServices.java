package com.examly.springapp.service;

import com.examly.springapp.models.EventModel;
import com.examly.springapp.repository.EventModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventModelServices {

    @Autowired
    private EventModelRepository eventModelRepository;

    public void addEvent(EventModel eventModel) {
        eventModelRepository.save(eventModel);
    }

    public String deleteEvent(Integer eventId) {
        eventModelRepository.deleteById(eventId);
        return "Event deleted";
    }

    public String editEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {
//            event.setEventName(updatedEvent.getEventName());
            event.setApplicantName(updatedEvent.getApplicantName());
            event.setApplicantAddress(updatedEvent.getApplicantAddress());
            event.setApplicantMobile(updatedEvent.getApplicantMobile());
            event.setApplicantEmail(updatedEvent.getApplicantEmail());
            event.setEventDate(updatedEvent.getEventDate());
            event.setEventTime(updatedEvent.getEventTime());
            event.setNoOfPeople(updatedEvent.getNoOfPeople());

            eventModelRepository.save(event);
            return "Event updated";
        } else {
            return "Event not found";
        }
    }

    public List<EventModel> getEventList(Integer userId) {
        return eventModelRepository.findByUserId(userId);
    }
    
}
