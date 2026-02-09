package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.entity.enums.SubscriptionStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubscriptionDto {
    @Schema(description = "Subscription ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "User ID", example = "2")
    private Long userId;

    @Schema(description = "Plan Type", example = "BUSINESS", allowableValues = {"STARTER", "BUSINESS", "ENTERPRISE"})
    private PlanType planType;

    @Schema(description = "Razorpay Subscription ID", example = "sub_1234567890")
    private String razorpaySubscriptionId;

    @Schema(description = "Subscription Status", example = "ACTIVE", allowableValues = {"CREATED", "ACTIVE", "HALTED", "CANCELLED"})
    private SubscriptionStatus status;

    @Schema(description = "Start Date", example = "2023-10-27 10:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDate;

    @Schema(description = "End Date", example = "2023-11-27 10:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDate;
}
