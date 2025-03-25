package com.railway.seatavailability.dto;


import lombok.Data;

import java.time.LocalDate;


@Data
public class SeatAvailabilityDTO {
    private Long id;
    private Long trainNumber;
    private LocalDate travelDate;
    private int availableSeats;

    public SeatAvailabilityDTO() {
    }

    public SeatAvailabilityDTO(Long id, Long trainNumber, int availableSeats) {
        this.id = id;
        this.trainNumber = trainNumber;
        this.availableSeats = availableSeats;
    }
}
