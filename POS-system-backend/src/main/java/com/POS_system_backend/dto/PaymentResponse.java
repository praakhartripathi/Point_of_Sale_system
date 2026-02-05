package com.POS_system_backend.dto;

import lombok.Data;

@Data
public class PaymentResponse {
    private String orderId;
    private String razorpayKeyId;
    private Double amount;
    private String currency;
    private String companyName;
}
