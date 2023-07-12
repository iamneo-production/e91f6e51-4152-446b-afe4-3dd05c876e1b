package com.examly.springapp.service;

import com.examly.springapp.models.EventModel;
import com.examly.springapp.repository.EventModelRepository;
import com.examly.springapp.email.EmailService;
import com.examly.springapp.email.EmailMOdel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


import java.util.List;
import java.util.Optional;

@Service
public class EventModelServices {

    @Autowired
    private EventModelRepository eventModelRepository;
    @Autowired
    private EmailService emailService;
    
    private ExecutorService executorService = Executors.newSingleThreadExecutor();
    
    public void addEvent(EventModel eventModel) {
        eventModelRepository.save(eventModel);
    
        if (eventModel.getApplicantEmail() != null && !eventModel.getApplicantEmail().isEmpty()) {
            // Prepare the email details
            EmailMOdel emailDetails = new EmailMOdel();
            emailDetails.setRecipient(eventModel.getApplicantEmail());
            emailDetails.setSubject("New Event Added");
            emailDetails.setMsgBody("A new event has been added successfully.");
    
            // Send the email asynchronously
            executorService.submit(() -> {
                try {
                    emailService.sendSimpleMail(emailDetails);
                } catch (Exception e) {
                }
            });
        }
    }
    

    public String deleteEvent(Integer eventId) {
        eventModelRepository.deleteById(eventId);
        return "Event deleted";
    }

    public String editEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {
            // Update the fields only if the corresponding fields in updatedEvent are not null
    
            if (updatedEvent.getApplicantName() != null) {
                event.setApplicantName(updatedEvent.getApplicantName());
            }
    
            if (updatedEvent.getApplicantAddress() != null) {
                event.setApplicantAddress(updatedEvent.getApplicantAddress());
            }
    
            if (updatedEvent.getApplicantMobile() != null) {
                event.setApplicantMobile(updatedEvent.getApplicantMobile());
            }
    
            if (updatedEvent.getApplicantEmail() != null) {
                event.setApplicantEmail(updatedEvent.getApplicantEmail());
            }
    
            if (updatedEvent.getEventDate() != null) {
                event.setEventDate(updatedEvent.getEventDate());
            }
    
            if (updatedEvent.getEventTime() != null) {
                event.setEventTime(updatedEvent.getEventTime());
            }
    
            if (updatedEvent.getNoOfPeople() != null) {
                event.setNoOfPeople(updatedEvent.getNoOfPeople());
            }
    
            eventModelRepository.save(event);
            return "Event updated";
        } else {
            return "Event not found";
        }
    }
    
    public String cancelEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {
            event.setDeletedEvent(updatedEvent.getDeletedEvent());

            eventModelRepository.save(event);
            return "Event Booking Cancelled";
        } else {
            return "Event not found";
        }
    }
 
    

    public List<EventModel> getEventList(Integer userId) {
        return eventModelRepository.findByUserId(userId);
    }

    public List<EventModel> getEvent(){
        return eventModelRepository.findAll();
    }

    public EventModel getSingleEvent(Integer eventId) {
        return eventModelRepository.findByEventId(eventId);
    }
    
}
