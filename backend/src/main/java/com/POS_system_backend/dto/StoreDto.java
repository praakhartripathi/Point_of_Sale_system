package com.POS_system_backend.dto;

import com.POS_system_backend.entity.StoreContact;
import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.StoreType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreDto {
    @Schema(description = "Store ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Store Brand Name", example = "Tech World", requiredMode = Schema.RequiredMode.REQUIRED)
    private String brand;

    @Schema(description = "Store Admin User ID", example = "2")
    private Long storeAdminId;

    @Schema(description = "Store Description", example = "Electronics and Gadgets Store")
    private String description;

    @Schema(description = "Store Type", example = "RETAIL", allowableValues = {"RETAIL", "RESTAURANT", "SERVICE", "WHOLESALE"})
    private StoreType storeType;

    @Schema(description = "Store Status", example = "ACTIVE", allowableValues = {"ACTIVE", "INACTIVE", "SUSPENDED"})
    private StoreStatus status;

    @Schema(description = "Store Contact Information")
    private StoreContact contact;

    @Schema(description = "Creation Timestamp", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Schema(description = "Last Updated Timestamp", example = "2023-10-28 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
