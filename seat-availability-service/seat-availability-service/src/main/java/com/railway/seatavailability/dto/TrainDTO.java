package com.railway.seatavailability.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainDTO {
    private Long id;
    private Long trainNumber;
    private int availableSeats;
}
