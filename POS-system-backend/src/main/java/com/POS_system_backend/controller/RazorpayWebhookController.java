package com.POS_system_backend.controller;

import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@CrossOrigin(origins = "*")
public class RazorpayWebhookController {

    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;

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
