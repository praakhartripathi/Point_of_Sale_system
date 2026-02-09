package com.POS_system_backend.controller;

import com.POS_system_backend.dto.*;
import com.POS_system_backend.service.TrialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trial")
@CrossOrigin(origins = "*")
@Tag(name = "Trial Controller", description = "Endpoints for managing trial accounts")
public class TrialController {

    private final TrialService trialService;

    public TrialController(TrialService trialService) {
        this.trialService = trialService;
    }

    @Operation(summary = "Sign up for a trial account", description = "Creates a new trial account.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Trial account created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input or email already exists", content = @Content)
    })
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signupTrial(
        @RequestBody TrialSignupRequest request) {

        AuthResponse response = trialService.signupTrial(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Sign in to trial account", description = "Authenticates a trial user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully authenticated",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content)
    })
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signinTrial(
        @RequestBody TrialSignInRequest request) {

        AuthResponse response = trialService.signinTrial(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Change password", description = "Changes the password for the authenticated trial user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password changed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input or password mismatch", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
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

    @Operation(summary = "Get trial profile", description = "Retrieves the profile of the authenticated trial user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved profile",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = TrialProfileResponse.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
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

    @Operation(summary = "Update trial profile", description = "Updates the profile of the authenticated trial user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Profile updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = TrialProfileResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
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
