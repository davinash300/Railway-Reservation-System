package com.railway.seatavailability.exception;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
public class FeignErrorDecoder implements ErrorDecoder {

    private final Logger logger = LoggerFactory.getLogger(FeignErrorDecoder.class);

    @Override
    public Exception decode(String methodKey, Response response) {
        String errorMessage = "Unexpected error while calling Train Service";
        try {
            if (response.body() != null) {
                errorMessage = convertStreamToString(response.body().asInputStream());
            }
        } catch (IOException e) {
            logger.error("Error reading Feign response body", e);
        }
        if (response.status() == 404) {
            logger.error("Train Service returned 404: {}", errorMessage);
            return new ResourceNotFoundException("No seat availability found for the requested train and date.");
        }
        return new RuntimeException("Feign Client Error: " + response.status() + " - " + errorMessage);
    }

    private String convertStreamToString(InputStream inputStream) throws IOException {
        return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));
    }
}