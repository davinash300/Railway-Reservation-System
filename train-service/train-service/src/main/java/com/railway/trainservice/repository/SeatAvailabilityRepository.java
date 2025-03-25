package com.railway.trainservice.repository;

import com.railway.trainservice.entity.SeatAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {
    Optional<SeatAvailability> findByTrainNumberAndTravelDate(String trainNumber, LocalDate travelDate);
}
