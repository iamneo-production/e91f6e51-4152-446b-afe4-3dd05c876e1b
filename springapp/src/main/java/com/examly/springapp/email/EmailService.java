package com.examly.springapp.email;

import com.examly.springapp.email.EmailMOdel;

public interface EmailService {

	// Method
	// To send a simple email
	String sendSimpleMail(EmailMOdel details);
	// To send a HtMl email
	String sendHtmlMail(EmailMOdel details);

	// Method
	// To send an email with attachment
	String sendMailWithAttachment(EmailMOdel details);
}
