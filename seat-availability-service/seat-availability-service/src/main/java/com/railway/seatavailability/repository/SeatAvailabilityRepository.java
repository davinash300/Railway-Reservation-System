package com.railway.seatavailability.repository;

import com.railway.seatavailability.entity.SeatAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {
    Optional<SeatAvailability> findByTrainNumberAndTravelDate(Long trainNumber, LocalDate travelDate);

    //    Optional<SeatAvailability> findByTrainId(Long trainId);
    @Query("SELECT s.trainNumber FROM SeatAvailability s WHERE s.travelDate = :date AND s.availableSeats > 0")
    List<String> findAvailableTrainNumbers(@Param("date") LocalDate date);


//    boolean existsById(Long id);
}