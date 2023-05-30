package com.examly.springapp.repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import com.examly.springapp.models.*;
import org.springframework.http.*;

// pratik
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Repository

public interface MenuModelRepository extends JpaRepository<MenuModel,Integer> {
    List<MenuModel> findAll(); 
    void deleteById(Integer id);//used to delete record from table based on id
    Optional<MenuModel> findByfoodMenuId(Integer id);
    
}