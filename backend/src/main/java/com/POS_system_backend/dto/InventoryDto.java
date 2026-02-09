package com.POS_system_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {
    @Schema(description = "Inventory ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Branch ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long branchId;

    @Schema(description = "Product ID", example = "101", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long productId;

    @Schema(description = "Quantity in stock", example = "50", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer quantity;

    @Schema(description = "Last updated timestamp", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastUpdated;
}
