package com.railway.seatavailability.service;

import com.railway.seatavailability.dto.SeatAvailabilityDTO;

import java.time.LocalDate;
import java.util.List;

public interface SeatAvailabilityService {
//    SeatAvailabilityDTO getSeatAvailability(String trainNumber, int numberOfSeats);
    SeatAvailabilityDTO getSeatAvailability(Long trainId, int numberOfSeats);
    void updateAvailableSeats(Long trainId, int availableSeats);
    List<String> findAvailableTrainNumbers(LocalDate date);

    void addSeatAvailability(SeatAvailabilityDTO seatAvailabilityDTO);
}