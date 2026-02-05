package com.POS_system_backend.controller;

import com.POS_system_backend.dto.OrderRequest;
import com.POS_system_backend.dto.PaymentResponse;
import com.POS_system_backend.service.RazorpayService;
import com.razorpay.RazorpayException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/razorpay")
@CrossOrigin(origins = "*")
@Tag(name = "Razorpay Controller", description = "Endpoints for Razorpay payment integration")
public class RazorpayController {

    private final RazorpayService razorpayService;

    public RazorpayController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    @Operation(summary = "Create Razorpay Order", description = "Creates a new order in Razorpay.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = PaymentResponse.class))),
        @ApiResponse(responseCode = "400", description = "Error creating order", content = @Content)
    })
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
