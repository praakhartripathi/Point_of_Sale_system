package com.POS_system_backend.service;

import com.POS_system_backend.entity.enums.PlanType;

public interface RazorpaySubscriptionService {
    String createSubscription(PlanType plan) throws Exception;
}
