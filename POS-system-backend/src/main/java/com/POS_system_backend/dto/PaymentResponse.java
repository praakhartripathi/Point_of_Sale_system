package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class PaymentResponse {
    @Schema(description = "Razorpay Order ID", example = "order_EKwxwAgItmmXdp")
    private String orderId;

    @Schema(description = "Razorpay Key ID", example = "rzp_test_1DP5mmOlF5G5ag")
    private String razorpayKeyId;

    @Schema(description = "Amount to be paid", example = "500.00")
    private Double amount;

    @Schema(description = "Currency code", example = "INR")
    private String currency;

    @Schema(description = "Company Name", example = "My Company")
    private String companyName;
}
