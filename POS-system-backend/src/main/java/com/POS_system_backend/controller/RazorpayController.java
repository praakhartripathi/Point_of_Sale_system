package com.POS_system_backend.controller;

import com.POS_system_backend.dto.OrderRequest;
import com.POS_system_backend.dto.PaymentResponse;
import com.POS_system_backend.service.RazorpayService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/razorpay")
@CrossOrigin(origins = "*")
public class RazorpayController {

    private final RazorpayService razorpayService;

    public RazorpayController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            PaymentResponse response = razorpayService.createOrder(orderRequest);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
