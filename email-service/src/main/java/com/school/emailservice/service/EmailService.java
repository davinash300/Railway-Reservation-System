package com.school.emailservice.service;

import com.school.emailservice.dto.EmailRequestDTO;
import com.school.emailservice.entity.EmailLog;
import com.school.emailservice.exception.EmailSendException;
import com.school.emailservice.repository.EmailLogRepository;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository;

    public EmailService(JavaMailSender mailSender, EmailLogRepository emailLogRepository) {
        this.mailSender = mailSender;
        this.emailLogRepository = emailLogRepository;
    }

    public void sendEmail(EmailRequestDTO request) {
        try {
            // Create MIME email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(request.getRecipientEmail());
            helper.setSubject(request.getSubject());
            helper.setText(request.getMessage(), true);

            // Send email
            mailSender.send(message);

            // Save email log in the database
            EmailLog emailLog = new EmailLog();
            emailLog.setRecipientEmail(request.getRecipientEmail());
            emailLog.setSubject(request.getSubject());
            emailLog.setMessage(request.getMessage());
            emailLog.setTimestamp(LocalDateTime.now());
            emailLog.setStatus("SENT");

            emailLogRepository.save(emailLog);
            LOGGER.info("Email successfully sent to {}", request.getRecipientEmail());

        } catch (Exception e) {
            LOGGER.error("Error while sending email", e);
            throw new EmailSendException("Failed to send email to " + request.getRecipientEmail());
        }
    }
}
