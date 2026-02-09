package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class OrderItemDto {
    @Schema(description = "Order Item ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Product Name", example = "Wireless Mouse", accessMode = Schema.AccessMode.READ_ONLY)
    private String productName;

    @Schema(description = "Quantity", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private int quantity;

    @Schema(description = "Unit Price", example = "25.00", accessMode = Schema.AccessMode.READ_ONLY)
    private double price;

    @Schema(description = "Product ID", example = "101", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long productId;
}
