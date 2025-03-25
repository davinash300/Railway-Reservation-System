package com.railway.trainservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@FeignClient(name = "seat-availability-service", url = "http://localhost:8083/api/seats")
public interface SeatAvailabilityClient {

    @GetMapping("/available-trains")
    List<String> getAvailableTrains(@RequestParam("date") String date);
}
