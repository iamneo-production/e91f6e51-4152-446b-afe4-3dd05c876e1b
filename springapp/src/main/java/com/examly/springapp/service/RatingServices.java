package com.examly.springapp.service;

import com.examly.springapp.models.*;
import com.examly.springapp.repository.EventModelRepository;
import com.examly.springapp.repository.ThemeModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import javax.annotation.PreDestroy;


@Service
public class RatingServices {
    
    @Autowired
    private EventModelRepository eventModelRepository;

    @Autowired
    private ThemeModelRepository themeModelRepository;

    private final ExecutorService executorService = Executors.newFixedThreadPool(5);

    public String rateEvent(Integer eventId, EventModel updatedEvent) {
        EventModel event = eventModelRepository.findById(eventId).orElse(null);
        if (event != null) {
            event.setRating(updatedEvent.getRating());
            event.setRating_Discription(updatedEvent.getRating_Discription());
            eventModelRepository.save(event);

            // Perform average rating calculation asynchronously using CompletableFuture
            CompletableFuture.runAsync(() -> calculateAndSaveAverageRating(event.getThemeId()), executorService);

            return "Rating Updated";
        } else {
            return "Event not found";
        }
    }

    private void calculateAndSaveAverageRating(Integer themeId) {
        List<EventModel> eventsByThemeId = eventModelRepository.findByThemeId(themeId);
        double totalRating = 0;
        int count = 0;

        for (EventModel e : eventsByThemeId) {
            if (e.getRating() != null && e.getRating() >= 0) {
                totalRating += e.getRating();
                count++;
            }
        }

        double averageRating = count > 0 ? Math.round((totalRating / count) * 10) / 10.0 : 0;

        // Update the averageRating in the theme table
        try {
            ThemeModel theme = themeModelRepository.findById(themeId).orElse(null);
            if (theme != null) {
                theme.setAverageRating(averageRating);
                theme.setTotalRating(count);
                themeModelRepository.save(theme);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Cleanup the executor service when the application stops
    @PreDestroy
    public void cleanUp() {
        executorService.shutdown();
    }
}

// -------------------------------pratik - raj--------------------------