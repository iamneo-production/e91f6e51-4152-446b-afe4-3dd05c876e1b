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
@Table(name = "Menu")

public class MenuModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodMenuId;
    // private Integer id;
    private String foodMenuType;
    private String foodMenuItems;
    private String foodMenuCost;
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;
    
}
