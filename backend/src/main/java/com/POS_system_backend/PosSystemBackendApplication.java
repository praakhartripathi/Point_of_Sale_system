package com.POS_system_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
public class PosSystemBackendApplication {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    public static void main(String[] args) {
        SpringApplication.run(PosSystemBackendApplication.class, args);
    }

    @PostConstruct
    public void init() {
        System.out.println("--------------------------------------------------");
        System.out.println("Loaded Google Client ID: " + clientId);
        System.out.println("--------------------------------------------------");
    }
}
