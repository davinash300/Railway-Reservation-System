package com.railway.trainservice.repository;

import com.railway.trainservice.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    List<Train> findBySourceAndDestination(String source, String destination);
    Optional<Train> findByTrainNumber(String trainNumber);

    @Query("SELECT t FROM Train t WHERE t.source = :source AND t.destination = :destination " +
            "AND t.trainNumber IN :trainNumbers")
    List<Train> findBySourceAndDestinationAndTrainNumberIn(@Param("source") String source,
                                                           @Param("destination") String destination,
                                                           @Param("trainNumbers") List<String> trainNumbers);


    List<Train> findBySourceAndDestinationAndDepartureDate(
            String source, String destination, LocalDate departureDate);}
