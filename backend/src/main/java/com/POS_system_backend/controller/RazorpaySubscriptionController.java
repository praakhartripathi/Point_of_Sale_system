package com.POS_system_backend.controller;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.service.RazorpaySubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/razorpay/subscription")
@CrossOrigin(origins = "*")
@Tag(name = "Razorpay Subscription Controller", description = "Endpoints for managing Razorpay subscriptions")
public class RazorpaySubscriptionController {

    private final RazorpaySubscriptionService razorpaySubscriptionService;

    public RazorpaySubscriptionController(RazorpaySubscriptionService razorpaySubscriptionService) {
        this.razorpaySubscriptionService = razorpaySubscriptionService;
    }

    @Operation(summary = "Create Subscription", description = "Creates a new subscription for a given plan.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Subscription created successfully",
            content = @Content(mediaType = "text/plain", schema = @Schema(type = "string", example = "sub_1234567890"))),
        @ApiResponse(responseCode = "400", description = "Error creating subscription", content = @Content)
    })
    @PostMapping("/create")
    public ResponseEntity<String> createSubscription(@RequestParam PlanType plan) {
        try {
            String subscriptionId = razorpaySubscriptionService.createSubscription(plan);
            return ResponseEntity.ok(subscriptionId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating subscription: " + e.getMessage());
        }
    }
}
