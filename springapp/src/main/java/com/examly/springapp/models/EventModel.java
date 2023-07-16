package com.examly.springapp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Event")
public class EventModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventId;
//    private Integer id;
    private String eventName;
    private String applicantName;
    private String applicantAddress;
    private String applicantMobile;
    private String applicantEmail;
    private String eventAddress;

    @JsonFormat(pattern = "dd MM yyyy")
    private String eventDate;
    private String eventTime;
    private  String noOfPeople;

    private Integer eventMenuID;  // automitically mereged menu table id  so that we can fetch url and other things
    private String addOnId;        // wants to automitically mereged with addon table id so that we can fetch image url
    private String eventCost;
    private Integer userId;        // To retrieve which user booked which event
    @Column(columnDefinition = "LONGTEXT")
    private String eventImg;
    private Integer themeId;


    private Integer rating;
    private String rating_Discription;

    //to check wether event got cancelled or notf
    private String DeletedEvent;
    private String EmailId;
    private String foodMenu;
    
}
