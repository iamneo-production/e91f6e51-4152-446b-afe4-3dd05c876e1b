package com.examly.springapp.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventController {

    @GetMapping("/")
    public ResponseEntity<String> getAppStatus() {
        String message = " App is running fine. Started at: " + LocalDateTime.now() + " This App has been developed by team Decoders";
        return ResponseEntity.status(HttpStatus.OK).body("{\"status  \": \""  + message + "  \"}");
    }
}
//to not display white label error