package com.POS_system_backend.controller;

import com.POS_system_backend.dto.*;
import com.POS_system_backend.service.TrialService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trial")
@CrossOrigin(origins = "*")
public class TrialController {

    private final TrialService trialService;

    public TrialController(TrialService trialService) {
        this.trialService = trialService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signupTrial(
        @RequestBody TrialSignupRequest request) {

        AuthResponse response = trialService.signupTrial(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signinTrial(
        @RequestBody TrialSignInRequest request) {

        AuthResponse response = trialService.signinTrial(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
        Authentication authentication,
        @Valid @RequestBody TrialUpdatePasswordRequest request) {

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        String email = authentication.getName();
        String message = trialService.changePassword(email, request);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/profile")
    public ResponseEntity<TrialProfileResponse> getProfile(
        Authentication authentication) {

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        TrialProfileResponse profile =
            trialService.getTrialProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<TrialProfileResponse> updateProfile(
        Authentication authentication,
        @RequestBody TrialUpdateProfileRequest request) {

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        TrialProfileResponse updatedProfile = trialService.updateProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
