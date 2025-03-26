package com.school.notificationservice.service;

import com.school.notificationservice.client.EmailFeignClient;
import com.school.notificationservice.dto.EmailRequestDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class NotificationService {

    private final EmailFeignClient emailFeignClient;
    private final Map<String, String> otpStorage = new HashMap<>();

    public NotificationService(EmailFeignClient emailFeignClient) {
        this.emailFeignClient = emailFeignClient;
    }

    // Send OTP using Feign
    public void sendOtp(String email) {
        String otp = generateOtp();
        otpStorage.put(email, otp);

        EmailRequestDTO emailRequest = new EmailRequestDTO();
        emailRequest.setRecipientEmail(email);
        emailRequest.setSubject("Your OTP for Login");
        emailRequest.setMessage("<p>Your OTP for login is: <b>" + otp + "</b></p>");

        emailFeignClient.sendEmail(emailRequest);
    }

    // Validate OTP
    public boolean validateOtp(String email, String otp) {
        return otp.equals(otpStorage.getOrDefault(email, ""));
    }

    // Generate 6-digit OTP
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
