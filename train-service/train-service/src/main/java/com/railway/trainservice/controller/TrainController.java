package com.railway.trainservice.controller;

import com.railway.trainservice.dto.SeatAvailabilityDTO;
import com.railway.trainservice.dto.TrainDTO;
import com.railway.trainservice.service.TrainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/trains")
@Tag(name = "Train Service", description = "Train Management API")
public class TrainController {

    private static final Logger log = LoggerFactory.getLogger(TrainController.class);

    @Autowired
    private TrainService trainService;

    @Operation(summary = "Search trains by source, destination, and date")
    @GetMapping("/search")
    public ResponseEntity<List<TrainDTO>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        log.info("Searching for trains from {} to {} on {}", source, destination, date);
        List<TrainDTO> trains = trainService.searchTrains(source, destination, date);
        return ResponseEntity.ok(trains);
    }



//    @GetMapping("/search")
//    public ResponseEntity<List<TrainDTO>> searchTrains(
//            @RequestParam String source,
//            @RequestParam String destination
//    ) {
//        log.info("Searching for trains from {} to {}", source, destination);
//        List<TrainDTO> trains = trainService.searchTrains(source, destination);
//        return ResponseEntity.ok(trains);
//    }



    @Operation(summary = "Get all trains")
    @GetMapping
    public ResponseEntity<List<TrainDTO>> getAllTrains() {
        log.info("Fetching all trains");
        return ResponseEntity.ok(trainService.getAllTrains());
    }

    @Operation(summary = "Get train by ID")
    @GetMapping("/{id}")
    public ResponseEntity<TrainDTO> getTrainById(@PathVariable Long id) {
        log.info("Fetching train with ID: {}", id);
        return ResponseEntity.ok(trainService.getTrainById(id));
    }

    @Operation(summary = "Get train by train number")
    @GetMapping("/number/{trainNumber}")
    public ResponseEntity<TrainDTO> getTrainByNumber(@PathVariable String trainNumber) {
        log.info("Fetching train with number: {}", trainNumber);
        return ResponseEntity.ok(trainService.getTrainByNumber(trainNumber));
    }

    @Operation(summary = "Check seat availability by train number and date")
    @GetMapping("/availability")
    public ResponseEntity<SeatAvailabilityDTO> getSeatAvailability(
            @RequestParam String trainNumber,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Fetching seat availability for train: {} on date: {}", trainNumber, date);
        return ResponseEntity.ok(trainService.getSeatAvailability(trainNumber, date));
    }

    @Operation(summary = "Create a new train")
    @PostMapping
    public ResponseEntity<TrainDTO> createTrain(@Valid @RequestBody TrainDTO trainDTO) {
        log.info("Creating new train: {}", trainDTO.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(trainService.createTrain(trainDTO));
    }

    @Operation(summary = "Update an existing train")
    @PutMapping("/{id}")
    public ResponseEntity<TrainDTO> updateTrain(@PathVariable Long id, @Valid @RequestBody TrainDTO trainDTO) {
        log.info("Updating train with ID: {}", id);
        return ResponseEntity.ok(trainService.updateTrain(id, trainDTO));
    }

    @Operation(summary = "Delete a train")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrain(@PathVariable Long id) {
        log.info("Deleting train with ID: {}", id);
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }
}
