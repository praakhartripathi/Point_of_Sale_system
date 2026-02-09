package com.POS_system_backend.controller;

import com.razorpay.Utils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@CrossOrigin(origins = "*")
@Tag(name = "Razorpay Webhook Controller", description = "Endpoint for handling Razorpay webhooks")
public class RazorpayWebhookController {

    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;

    @Operation(summary = "Handle Razorpay Webhook", description = "Processes webhook events from Razorpay (e.g., subscription activated/cancelled).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Webhook processed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid signature or payload", content = @Content)
    })
    @PostMapping("/razorpay")
    public ResponseEntity<String> handleWebhook(
        @RequestBody String payload,
        @RequestHeader("X-Razorpay-Signature") String signature) {

        try {
            Utils.verifyWebhookSignature(payload, signature, webhookSecret);

            JSONObject event = new JSONObject(payload);
            String eventType = event.getString("event");

            if ("subscription.activated".equals(eventType)) {
                // TODO: mark subscription ACTIVE in database
                System.out.println("Subscription activated: " + event.toString());
            }

            if ("subscription.cancelled".equals(eventType)) {
                // TODO: mark subscription CANCELLED in database
                System.out.println("Subscription cancelled: " + event.toString());
            }

            return ResponseEntity.ok("OK");

        } catch (Exception e) {
            System.out.println("Webhook verification failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }
    }
}
