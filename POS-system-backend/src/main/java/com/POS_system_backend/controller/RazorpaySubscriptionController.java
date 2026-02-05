package com.POS_system_backend.controller;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.service.RazorpaySubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/razorpay/subscription")
@CrossOrigin(origins = "*")
public class RazorpaySubscriptionController {

    private final RazorpaySubscriptionService razorpaySubscriptionService;

    public RazorpaySubscriptionController(RazorpaySubscriptionService razorpaySubscriptionService) {
        this.razorpaySubscriptionService = razorpaySubscriptionService;
    }

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
