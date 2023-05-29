package com.examly.springapp.models;
import javax.persistence.Table;
import javax.persistence.*;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;


import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Event")
public class EventModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer eventId;
    private String eventName;
    private String applicantName;
    private String applicantAddress;
    private String applicantMobile;
    private String applicantEmail;
    private String eventAddress;
    
    private Date eventDate;
    private LocalDateTime eventTime;

    private Integer eventMenuID;  // automitically mereged menu table id  so that we can fetch url and other things
    private Integer addOnId;        // wants to automitically mereged with addon table id so that we can fetch image url
    private String eventCost;
    
}
