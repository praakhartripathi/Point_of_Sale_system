package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.entity.enums.SubscriptionStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubscriptionDto {
    private Long id;
    private Long userId;
    private PlanType planType;
    private String razorpaySubscriptionId;
    private SubscriptionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
