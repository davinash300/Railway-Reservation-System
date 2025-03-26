package com.school.emailservice.exception;

public class EmailSendException extends RuntimeException{
    public EmailSendException(String message) {
        super(message);
    }
}
