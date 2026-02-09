package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class OrderRequest {
    @Schema(description = "Amount to be paid", example = "500.00")
    private Double amount;

    @Schema(description = "Currency code", example = "INR")
    private String currency;

    @Schema(description = "Receipt ID", example = "receipt#1")
    private String receipt;
}
