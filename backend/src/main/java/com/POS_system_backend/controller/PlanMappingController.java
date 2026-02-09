package com.POS_system_backend.controller;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.service.PlanMappingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
@Tag(name = "Plan Mapping Controller", description = "Endpoints for retrieving subscription plan IDs")
public class PlanMappingController {

    private final PlanMappingService planMappingService;

    public PlanMappingController(PlanMappingService planMappingService) {
        this.planMappingService = planMappingService;
    }

    @Operation(summary = "Get Razorpay Plan ID", description = "Retrieves the Razorpay Plan ID for a given plan type.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved plan ID",
            content = @Content(mediaType = "text/plain", schema = @Schema(type = "string", example = "plan_StarterXYZ")))
    })
    @GetMapping("/{planType}")
    public ResponseEntity<String> getPlanId(@PathVariable PlanType planType) {
        String planId = planMappingService.getPlanId(planType);
        return ResponseEntity.ok(planId);
    }
}
