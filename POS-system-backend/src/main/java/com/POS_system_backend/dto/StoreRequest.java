package com.POS_system_backend.dto;

import com.POS_system_backend.entity.StoreContact;
import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.StoreType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StoreRequest {
    @Schema(description = "Store Brand Name", example = "Tech World", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Brand name is required")
    private String brand;

    @Schema(description = "Store Description", example = "Electronics and Gadgets Store")
    private String description;

    @Schema(description = "Store Type", example = "RETAIL", allowableValues = {"RETAIL", "RESTAURANT", "SERVICE", "WHOLESALE"})
    private StoreType storeType;

    @Schema(description = "Store Status", example = "ACTIVE", allowableValues = {"ACTIVE", "INACTIVE", "SUSPENDED"})
    private StoreStatus status;

    @Schema(description = "Store Contact Information")
    private StoreContact contact;
}
