package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository

public interface ThemeModelRepository extends JpaRepository<ThemeModel,Integer> {
    List<CourseModel> findAll(); 
    Optional<CourseModel> findBycourseId(Integer id); 
    boolean existsByCourseId(Integer id); //method checks if a record exists in table with the specified id
    void deleteById(Integer id);//used to delete record from table based on id
    
}
