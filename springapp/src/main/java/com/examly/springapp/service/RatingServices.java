package com.examly.springapp.service;

import com.examly.springapp.models.*;
import com.examly.springapp.repository.EventModelRepository;
import com.examly.springapp.repository.ThemeModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServices {
    @Autowired
    private EventModelRepository eventModelRepository;
    
    @Autowired
    private ThemeModelRepository themeModelRepository;

    public String rateEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {

            event.setRating(updatedEvent.getRating());
            event.setRating_Discription(updatedEvent.getRating_Discription());

            eventModelRepository.save(event);

            ThemeModel theme = null;
            Optional<ThemeModel> optionalTheme = themeModelRepository.findByThemeId(event.getThemeId());
            if (optionalTheme.isPresent()) {
                theme = optionalTheme.get();
            } else {
                return "Theme not found";
            }

            // Calculate average rating for each themeId
            List<EventModel> eventsByThemeId = eventModelRepository.findByThemeId(event.getThemeId());
            double totalRating = 0;
            int count = 0;
            
            for (EventModel e : eventsByThemeId) {
                if (e.getRating() != null && e.getRating() >= 0) {
                    totalRating += e.getRating();
                    count++;
                }
            }
            
            double averageRating = count > 0 ? totalRating / count : 0;
            // Update the averageRating in the corresponding theme table
            
            if (theme != null) {
                theme.setAverageRating(averageRating);
                themeModelRepository.save(theme);
            }
            return "Rating Updated";

            
        } else {
            return "Event not found";
        }
    }
    
    
}
