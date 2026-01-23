package com.POS_system_backend.controller;

import com.POS_system_backend.dto.LoginRequest;
import com.POS_system_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest request) {
        Map<String, Object> response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}