// Java Program to Illustrate Creation Of
// Service Interface

package com.examly.springapp.email;

// Importing required classes
import com.examly.springapp.email.EmailMOdel;

// Interface
public interface EmailService {

	// Method
	// To send a simple email
	String sendSimpleMail(EmailMOdel details);

	// Method
	// To send an email with attachment
	String sendMailWithAttachment(EmailMOdel details);
}
