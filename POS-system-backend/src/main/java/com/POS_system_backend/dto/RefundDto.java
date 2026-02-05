package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.PaymentType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefundDto {
    @Schema(description = "Refund ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Order ID associated with the refund", example = "101", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long orderId;

    @Schema(description = "Reason for refund", example = "Defective product")
    private String reason;

    @Schema(description = "Refund Amount", example = "50.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private double amount;

    @Schema(description = "Cashier ID who processed the refund", example = "2")
    private Long cashierId;

    @Schema(description = "Branch ID", example = "1")
    private Long branchId;

    @Schema(description = "Shift Report ID", example = "5")
    private Long shiftReportId;

    @Schema(description = "Payment Type", example = "CASH", allowableValues = {"CASH", "CARD", "UPI", "ONLINE"})
    private PaymentType paymentType;

    @Schema(description = "Refund creation timestamp", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
