package com.POS_system_backend.service;

import com.POS_system_backend.entity.enums.PlanType;

public interface PlanMappingService {
    String getPlanId(PlanType plan);
}
