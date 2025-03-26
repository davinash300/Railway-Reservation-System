package com.school.notificationservice.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponseDTO {
    private Long id;
    private String recipientEmail;
    private String recipientName; // New field
    private String subject;
    private String message;
    private String ctaLink; // New field
    private LocalDateTime timestamp;
}
