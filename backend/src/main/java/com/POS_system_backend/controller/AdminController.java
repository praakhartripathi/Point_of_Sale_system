package com.POS_system_backend.controller;

import com.POS_system_backend.entity.DemoRequest;
import com.POS_system_backend.service.DemoRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('SUPERADMIN')")
@Tag(name = "Admin Controller", description = "Endpoints for Super Admin operations")
public class AdminController {

    @Autowired
    private DemoRequestService demoRequestService;

    @Operation(
        summary = "Get all demo requests",
        description = "Retrieves a list of all submitted demo requests. Only accessible by SUPERADMIN."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved list of demo requests",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DemoRequest.class))
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Access Denied - User does not have SUPERADMIN role",
            content = @Content
        )
    })
    @GetMapping("/demo-requests")
    public ResponseEntity<List<DemoRequest>> getAllDemoRequests() {
        List<DemoRequest> demoRequests = demoRequestService.getAllDemoRequests();
        return new ResponseEntity<>(demoRequests, HttpStatus.OK);
    }

    @Operation(
        summary = "Approve a demo request",
        description = "Approves a specific demo request by ID. Optional notes can be added."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Demo request approved successfully"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Demo request not found",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Access Denied",
            content = @Content
        )
    })
    @PostMapping("/demo-requests/{id}/approve")
    public ResponseEntity<String> approveDemoRequest(
        @PathVariable Long id,
        @RequestParam(required = false) String notes) {
        demoRequestService.approveDemoRequest(id, notes);
        return new ResponseEntity<>("Demo request approved successfully", HttpStatus.OK);
    }

    @Operation(
        summary = "Reject a demo request",
        description = "Rejects a specific demo request by ID. Optional notes can be added."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Demo request rejected successfully"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Demo request not found",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Access Denied",
            content = @Content
        )
    })
    @PostMapping("/demo-requests/{id}/reject")
    public ResponseEntity<String> rejectDemoRequest(
        @PathVariable Long id,
        @RequestParam(required = false) String notes) {
        demoRequestService.rejectDemoRequest(id, notes);
        return new ResponseEntity<>("Demo request rejected successfully", HttpStatus.OK);
    }
}
