package com.railway.seatavailability.controller;

import com.railway.seatavailability.dto.SeatAvailabilityDTO;
import com.railway.seatavailability.service.SeatAvailabilityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/seats")
public class SeatAvailabilityController {


    @Autowired
    private SeatAvailabilityService seatAvailabilityService;

    @PostMapping
    public ResponseEntity<String> addSeatAvailability(@RequestBody SeatAvailabilityDTO seatAvailabilityDTO) {
        log.info("Adding seat availability for trainId: {}", seatAvailabilityDTO.getId());
        seatAvailabilityService.addSeatAvailability(seatAvailabilityDTO);
        return ResponseEntity.ok("Seat availability added successfully");
    }

    @GetMapping("/availability")
    public ResponseEntity<SeatAvailabilityDTO> getSeatAvailability(
            @RequestParam Long trainId,
            @RequestParam int seats) {
        log.info("Checking seat availability for trainId: {} with {} seats", trainId, seats);
        SeatAvailabilityDTO seatAvailability = seatAvailabilityService.getSeatAvailability(trainId, seats);
        log.info("Seat availability found: {}", seatAvailability);
        return ResponseEntity.ok(seatAvailability);
    }

    @PutMapping("/update/{trainId}")
    public void updateAvailableSeats(@PathVariable Long trainId, @RequestParam int availableSeats) {
        seatAvailabilityService.updateAvailableSeats(trainId, availableSeats);
    }

    @GetMapping("/available-trains")
    public List<String> getAvailableTrains(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return seatAvailabilityService.findAvailableTrainNumbers(date);
    }


}
