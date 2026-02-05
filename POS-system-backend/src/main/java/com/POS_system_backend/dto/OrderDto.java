package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    @Schema(description = "Order ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Customer ID", example = "1")
    private Long customerId;

    @Schema(description = "Store ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long storeId;

    @Schema(description = "Branch ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long branchId;

    @Schema(description = "Cashier User ID", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long cashierId;

    @Schema(description = "List of order items")
    private List<OrderItemDto> items;

    @Schema(description = "Total order amount", example = "150.00", accessMode = Schema.AccessMode.READ_ONLY)
    private double totalAmount;

    @Schema(description = "Order status", example = "PENDING", allowableValues = {"PENDING", "COMPLETED", "CANCELLED"})
    private OrderStatus orderStatus;

    @Schema(description = "Payment status", example = "PAID", allowableValues = {"PENDING", "PAID", "FAILED"})
    private PaymentStatus paymentStatus;

    @Schema(description = "Order creation timestamp", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
