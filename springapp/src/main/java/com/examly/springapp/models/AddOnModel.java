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
@Table(name = "Addon")
public class AddOnModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addOnId;
    // private Integer id;
    private String addOnName;
    private String addOnDescription;
    private String addOnPrice;
    private String imgUrlAddons;

    

    

}














//........................ pratik

