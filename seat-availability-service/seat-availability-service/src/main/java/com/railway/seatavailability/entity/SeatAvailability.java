package com.railway.seatavailability.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "seat_availability")
public class SeatAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long trainNumber;

    @Column(nullable = false)
    private LocalDate travelDate;

    @Column(nullable = false)
    private int availableSeats;

    //@Column(nullable = false)
   // private boolean available;
}

