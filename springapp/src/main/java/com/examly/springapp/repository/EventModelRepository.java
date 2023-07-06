package com.examly.springapp.repository;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
@Repository
public interface EventModelRepository extends JpaRepository<EventModel,Integer> {

    List<EventModel> findAll();
    List<EventModel> findByUserId(Integer userId);
    EventModel findByEventId(Integer eventId);
    List<EventModel> findByThemeId(Integer themeId);
}