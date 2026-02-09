package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.PlanType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CreateSubscriptionRequest {
    @Schema(description = "Type of subscription plan", example = "STARTER", requiredMode = Schema.RequiredMode.REQUIRED,
        allowableValues = {"STARTER", "BUSINESS", "ENTERPRISE"})
    private PlanType planType;
}
