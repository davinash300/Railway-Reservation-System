package com.railway.seatavailability.service;

import com.railway.seatavailability.client.TrainServiceClient;
import com.railway.seatavailability.dto.SeatAvailabilityDTO;
import com.railway.seatavailability.dto.TrainDTO;
import com.railway.seatavailability.entity.SeatAvailability;
import com.railway.seatavailability.repository.SeatAvailabilityRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SeatAvailabilityServiceImpl implements SeatAvailabilityService {

    private static final Logger logger = LoggerFactory.getLogger(SeatAvailabilityServiceImpl.class);

    private final SeatAvailabilityRepository seatAvailabilityRepository;
    private final TrainServiceClient trainServiceClient;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    public SeatAvailabilityServiceImpl(SeatAvailabilityRepository seatAvailabilityRepository, TrainServiceClient trainServiceClient) {
        this.seatAvailabilityRepository = seatAvailabilityRepository;
        this.trainServiceClient = trainServiceClient;
    }

    public List<String> findAvailableTrainNumbers(LocalDate date) {
        return seatAvailabilityRepository.findAvailableTrainNumbers(date);
    }

    @Override
    public void addSeatAvailability(SeatAvailabilityDTO seatAvailabilityDTO) {
        logger.info("Adding seat availability for Train ID: {}", seatAvailabilityDTO.getId());

        // Check if seat availability already exists
//        if (seatAvailabilityRepository.existsById(seatAvailabilityDTO.getId())) {
//            logger.warn("Seat availability already exists for Train ID: {}", seatAvailabilityDTO.getId());
//            throw new RuntimeException("Seat availability already exists for Train ID: " + seatAvailabilityDTO.getId());
//        }

        // Save seat availability
        SeatAvailability seatAvailability = modelMapper.map(seatAvailabilityDTO, SeatAvailability.class);
        seatAvailabilityRepository.save(seatAvailability);
    }


    @Override
    public SeatAvailabilityDTO getSeatAvailability(Long trainId, int numberOfSeats) {
        logger.info("Fetching seat availability for Train ID: {}", trainId);

        // Fetch train details
        TrainDTO train = Optional.ofNullable(trainServiceClient.getTrainById(trainId))
                .orElseThrow(() -> {
                    logger.error("Train not found with ID: {}", trainId);
                    return new RuntimeException("Train not found with ID: " + trainId);
                });

        logger.info("Train found: {} with {} available seats", train.getTrainNumber(), train.getAvailableSeats());

        // Check seat availability
        if (train.getAvailableSeats() < numberOfSeats) {
            logger.warn("Requested {} seats, but only {} are available.", numberOfSeats, train.getAvailableSeats());
            throw new RuntimeException("Not enough seats available!");
        }

        // Return updated availability after considering the request
        int updatedSeats = train.getAvailableSeats() - numberOfSeats;
        logger.info("Booking {} seats. Remaining seats: {}", numberOfSeats, updatedSeats);

        return new SeatAvailabilityDTO(trainId, train.getTrainNumber(), updatedSeats);
    }

    @Override
    @Transactional
    public void updateAvailableSeats(Long trainId, int availableSeats) {
//        SeatAvailability seatAvailability = seatAvailabilityRepository.findByTrainId(trainId)
//                .orElseThrow(() -> new RuntimeException("Train not found with ID: " + trainId));
//        seatAvailability.setAvailableSeats(availableSeats);
//        seatAvailabilityRepository.save(seatAvailability);
    }
}
