package com.POS_system_backend.controller;

import com.POS_system_backend.dto.ChangePasswordRequest;
import com.POS_system_backend.dto.LoginRequest;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.entity.TrialAccount;
import com.POS_system_backend.service.TrialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/trial")
@CrossOrigin(origins = "*") 
public class TrialController {

    @Autowired
    private TrialService trialService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerTrial(@RequestBody TrialSignupRequest request) {
        Map<String, Object> response = trialService.createTrialAccount(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTrial(@RequestBody LoginRequest request) {
        Map<String, Object> response = trialService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Map<String, Object> response = trialService.changePassword(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        Map<String, Object> response = trialService.getProfile();
        return ResponseEntity.ok(response);
    }
}