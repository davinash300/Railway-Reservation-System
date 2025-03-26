package com.school.emailservice.controller;

import com.school.emailservice.dto.EmailRequestDTO;
import com.school.emailservice.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestDTO emailRequestDTO) {
        emailService.sendEmail(emailRequestDTO);
        return ResponseEntity.ok("Email sent successfully.");
    }
}
