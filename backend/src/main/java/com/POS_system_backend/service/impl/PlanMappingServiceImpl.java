package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.service.PlanMappingService;
import org.springframework.stereotype.Service;

@Service
public class PlanMappingServiceImpl implements PlanMappingService {

    @Override
    public String getPlanId(PlanType plan) {
        return switch (plan) {
            case STARTER -> "plan_StarterXYZ";
            case BUSINESS -> "plan_BusinessXYZ";
            case ENTERPRISE -> "plan_EnterpriseXYZ";
        };
    }
}
