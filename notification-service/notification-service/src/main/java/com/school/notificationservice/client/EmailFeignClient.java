package com.school.notificationservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.school.notificationservice.dto.EmailRequestDTO;


@FeignClient(name = "email-service", url = "${email-service.url}")
public interface EmailFeignClient {

    @PostMapping("/send")
    void sendEmail(@RequestBody EmailRequestDTO emailRequestDTO);
}
