package com.railway.trainservice.service;


import com.railway.trainservice.client.SeatAvailabilityClient;
import com.railway.trainservice.dto.SeatAvailabilityDTO;
import com.railway.trainservice.dto.TrainDTO;
import com.railway.trainservice.entity.SeatAvailability;
import com.railway.trainservice.entity.Train;
import com.railway.trainservice.exception.ResourceNotFoundException;
import com.railway.trainservice.repository.SeatAvailabilityRepository;
import com.railway.trainservice.repository.TrainRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainServiceImpl implements TrainService {
    private static final Logger log = LoggerFactory.getLogger(TrainServiceImpl.class);

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private SeatAvailabilityRepository seatAvailabilityRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SeatAvailabilityClient seatAvailabilityClient;


    @Override
    public List<TrainDTO> searchTrains(String source, String destination, LocalDate date) {
        // Convert date to String format (yyyy-MM-dd) before passing to Feign Client
        String formattedDate = date.format(DateTimeFormatter.ISO_LOCAL_DATE);

        // Fetch train details from TrainRepository
        List<Train> trains = trainRepository.findBySourceAndDestinationAndDepartureDate(source, destination, date);

        // Convert to DTOs and return
        return trains.stream()
                .map(train -> modelMapper.map(train, TrainDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public List<TrainDTO> searchTrains(String source, String destination) {
        log.info("Fetching trains from database for source: {} and destination: {}", source, destination);
        List<Train> trains = trainRepository.findBySourceAndDestination(source, destination);
        if (trains.isEmpty()) {
            log.warn("No trains found for source: {} and destination: {}", source, destination);
        }
        return trains.stream()
                .map(train -> modelMapper.map(train, TrainDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SeatAvailabilityDTO getSeatAvailability(String trainNumber, LocalDate travelDate) {
        Train train = trainRepository.findByTrainNumber(trainNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found with number: " + trainNumber));
        SeatAvailability seatAvailability = seatAvailabilityRepository.findByTrainNumberAndTravelDate(trainNumber, travelDate)
                .orElseThrow(() -> new ResourceNotFoundException("No seat availability found for train: " + trainNumber + " on " + travelDate));
        log.info("Seats available for train {} on {}: {}", trainNumber, travelDate, seatAvailability.getAvailableSeats());
        return new SeatAvailabilityDTO(trainNumber, travelDate, seatAvailability.getAvailableSeats());
    }

    @Override
    public List<TrainDTO> getAllTrains() {
        log.info("Fetching all trains");
        return trainRepository.findAll().stream()
                .map(train -> modelMapper.map(train, TrainDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public TrainDTO getTrainById(Long id) {
        log.info("Fetching train with ID: {}", id);
        Train train = trainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));
        return modelMapper.map(train, TrainDTO.class);
    }

    @Override
    public TrainDTO getTrainByNumber(String trainNumber) {
        Train train = trainRepository.findByTrainNumber(trainNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found with number: " + trainNumber));
        return modelMapper.map(train, TrainDTO.class);
    }

    @Override
    public TrainDTO createTrain(TrainDTO trainDTO) {
        log.info("Creating new train: {}", trainDTO.getName());
        Train train = modelMapper.map(trainDTO, Train.class);
        return modelMapper.map(trainRepository.save(train), TrainDTO.class);
    }

    @Override
    public TrainDTO updateTrain(Long id, TrainDTO trainDTO) {
        log.info("Updating train with ID: {}", id);
        Train existingTrain = trainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));
        modelMapper.map(trainDTO, existingTrain);
        return modelMapper.map(trainRepository.save(existingTrain), TrainDTO.class);
    }

    @Override
    public void deleteTrain(Long id) {
        log.info("Deleting train with ID: {}", id);
        Train train = trainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));
        trainRepository.delete(train);
    }
}









