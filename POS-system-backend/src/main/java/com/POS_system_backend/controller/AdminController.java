package com.POS_system_backend.controller;

import com.POS_system_backend.entity.DemoRequest;
import com.POS_system_backend.service.DemoRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('SUPERADMIN')") // Apply this to all methods in this controller
public class AdminController {

    @Autowired
    private DemoRequestService demoRequestService;

    @GetMapping("/demo-requests")
    public ResponseEntity<List<DemoRequest>> getAllDemoRequests() {
        List<DemoRequest> demoRequests = demoRequestService.getAllDemoRequests();
        return new ResponseEntity<>(demoRequests, HttpStatus.OK);
    }

    @PostMapping("/demo-requests/{id}/approve")
    public ResponseEntity<String> approveDemoRequest(@PathVariable Long id, @RequestParam(required = false) String notes) {
        demoRequestService.approveDemoRequest(id, notes);
        return new ResponseEntity<>("Demo request approved successfully", HttpStatus.OK);
    }

    @PostMapping("/demo-requests/{id}/reject")
    public ResponseEntity<String> rejectDemoRequest(@PathVariable Long id, @RequestParam(required = false) String notes) {
        demoRequestService.rejectDemoRequest(id, notes);
        return new ResponseEntity<>("Demo request rejected successfully", HttpStatus.OK);
    }
}
