// Java Program to Create Rest Controller that
// Defines various API for Sending Mail

package com.examly.springapp.email;

// Importing required classes
import com.examly.springapp.email.EmailMOdel;
import com.examly.springapp.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

// Annotation
@RestController
// Class
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmailController {

	@Autowired private EmailService emailService;

	// Sending a simple Email
	@PostMapping("/sendMail")
	public String
	sendMail(@RequestBody EmailMOdel details)
	{
		String status
			= emailService.sendSimpleMail(details);

		return status;
	}

	// Sending email with attachment
	@PostMapping("/sendMailWithAttachment")
	public String sendMailWithAttachment(
		@RequestBody EmailMOdel details)
	{
		String status
			= emailService.sendMailWithAttachment(details);

		return status;
	}
}
