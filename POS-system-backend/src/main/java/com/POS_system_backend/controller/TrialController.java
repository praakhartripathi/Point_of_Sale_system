package com.POS_system_backend.controller;

import com.POS_system_backend.dto.*;
import com.POS_system_backend.service.TrialService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
            @RequestBody TrialSigninRequest request) {

        AuthResponse response = trialService.signinTrial(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @AuthenticationPrincipal String email,
            @RequestBody TrialChangePassword request) {

        String message = trialService.changePassword(email, request);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/profile")
    public ResponseEntity<TrialProfileResponse> getProfile(
            @AuthenticationPrincipal String email) {

        TrialProfileResponse profile =
                trialService.getTrialProfile(email);

        return ResponseEntity.ok(profile);
    }
}