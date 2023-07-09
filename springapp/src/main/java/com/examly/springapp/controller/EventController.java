package com.examly.springapp.controller;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/")
public class EventController {

    @GetMapping("/")
    public ResponseEntity<String> getAppStatus() {
        String message = "Server is running fine. Started at: " + LocalDateTime.now() ;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_HTML);
        headers.add("X-Content-Type-Options", "nosniff");

        String htmlContent = "<html><body style=\"background-color: black; color: white;\">";
        htmlContent += "<h1>Welcome to Our Event Management App Server</h1>";
        htmlContent += "<p>" + message + "</p>";
        htmlContent += "</body></html>";
        htmlContent += "<h1> This Server has been developed by Team Decoders for Event Management App </h1>";

        return new ResponseEntity<>(htmlContent, headers, HttpStatus.OK);
    }
}

//to not display white label error


















// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.time.LocalDateTime;
// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/")
// public class EventController {

//     @GetMapping("/")
//     public ResponseEntity<String> getAppStatus() {
//         String message = "App is running fine. Started at: " + LocalDateTime.now() + " This App has been developed by team Decoders";

//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.add("X-Content-Type-Options", "nosniff");

//         Map<String, String> jsonResponse = new HashMap<>();
//         jsonResponse.put("status", message);

//         ObjectMapper objectMapper = new ObjectMapper();
//         String jsonContent;
//         try {
//             jsonContent = objectMapper.writeValueAsString(jsonResponse);
//         } catch (JsonProcessingException e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting to JSON");
//         }

//         return new ResponseEntity<>(jsonContent, headers, HttpStatus.OK);
//     }
// }
