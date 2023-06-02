package com.examly.springapp.repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository

public interface AddOnModelRepository extends JpaRepository<AddOnModel,Integer>{
    List<AddOnModel> findAll(); 
    void deleteById(Integer id);//used to delete record from table based on id
    
}