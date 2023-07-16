package com.examly.springapp.models;
import java.lang.annotation.Inherited;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Theme")
public class ThemeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer themeId;
    // private Integer id;
    private String themeName;
    @Column(columnDefinition = "LONGTEXT")
    private String themeimgUrl;
    private String themeDescription;
    private String themephotographer;
    private String themeVideographer;
    private String themeReturnGift;
    private Long cost;
    private Double averageRating;
    private Integer TotalRating;
    private String Location; 
    

    
}


