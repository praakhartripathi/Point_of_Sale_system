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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
@Tag(name = "Demo Controller", description = "Public endpoints for demo requests")
public class DemoController {

    @Autowired
    private DemoRequestService demoRequestService;

    @Operation(summary = "Submit a demo request", description = "Allows public users to submit a request for a product demo.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Demo request submitted successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DemoRequest.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping("/demo-request")
    public ResponseEntity<DemoRequest> submitDemoRequest(@RequestBody DemoRequest demoRequest) {
        DemoRequest createdRequest = demoRequestService.createDemoRequest(demoRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }
}
