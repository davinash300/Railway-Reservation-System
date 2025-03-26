package com.school.notificationservice.dto;

public class EmailRequestDTO {
    private String recipientEmail;
    private String recipientName; // New field
    private String subject;
    private String message;
    private String ctaLink; // New field for the button link
    
    
    
	public EmailRequestDTO() {
	}
	public EmailRequestDTO(String recipientEmail, String recipientName, String subject, String message,
			String ctaLink) {
		super();
		this.recipientEmail = recipientEmail;
		this.recipientName = recipientName;
		this.subject = subject;
		this.message = message;
		this.ctaLink = ctaLink;
	}
	public String getRecipientEmail() {
		return recipientEmail;
	}
	public void setRecipientEmail(String recipientEmail) {
		this.recipientEmail = recipientEmail;
	}
	public String getRecipientName() {
		return recipientName;
	}
	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getCtaLink() {
		return ctaLink;
	}
	public void setCtaLink(String ctaLink) {
		this.ctaLink = ctaLink;
	}
    
    
}

