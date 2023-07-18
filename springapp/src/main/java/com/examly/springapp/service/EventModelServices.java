package com.examly.springapp.service;

import com.examly.springapp.models.EventModel;
import com.examly.springapp.repository.EventModelRepository;
import com.examly.springapp.email.EmailService;
import com.examly.springapp.email.EmailMOdel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

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
        emailDetails.setSubject("Event Booking Confirmation");
        emailDetails.setMsgBody(buildEmailContent(eventModel));

        // Send the email asynchronously
        executorService.submit(() -> {
            try {
                emailService.sendHtmlMail(emailDetails);
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


    // booking confirmation template
    private String buildEmailContent(EventModel eventModel) {
        // Define the constant for table cell style
        final String CELL_STYLE = "<td style='border: 1px solid black; padding: 8px; text-align: center;'>";
    
        // Build the event details table
        return "Dear " + eventModel.getApplicantName() + ",<br><br>" +
                "We are delighted to inform you that a new event has been successfully added to our system. " +
                "This email serves as a confirmation of the event details. Please find the event Boooking information Below.<br>" +
                "<table style='border-collapse: collapse; width: 100%;'>" +
                "<tr>" +
                "<th style='border: 1px solid black; padding: 8px; text-align: center;'>Event Name</th>" +
                "<th style='border: 1px solid black; padding: 8px; text-align: center;'>Event Date</th>" +
                "<th style='border: 1px solid black; padding: 8px; text-align: center;'>Event Time</th>" +
                "<th style='border: 1px solid black; padding: 8px; text-align: center;'>Event Address</th>" +
                "</tr>" +
                "<tr>" +
                CELL_STYLE + eventModel.getEventName() + "</td>" +
                CELL_STYLE + eventModel.getEventDate() + "</td>" +
                CELL_STYLE + LocalTime.parse(eventModel.getEventTime(), DateTimeFormatter.ofPattern("HH:mm"))
                        .format(DateTimeFormatter.ofPattern("hh:mm a")) + "</td>" +
                CELL_STYLE + eventModel.getEventAddress() + "</td>" +
                "</tr>" +
                "</table>" +
                "<br><br>" +
                "We appreciate your trust in our event management services. Our team will ensure a smooth and memorable experience for you and your guests.<br>" +
                "If you have any further inquiries or require any assistance, please feel free to reach out to us. We are always here to help.<br><br>" +
                "<b>Thank you once again for choosing our services. We look forward to making your event a resounding success.</b>";
    }
    
}
