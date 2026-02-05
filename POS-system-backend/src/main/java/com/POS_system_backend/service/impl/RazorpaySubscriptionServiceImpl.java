package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.entity.enums.SubscriptionStatus;
import com.POS_system_backend.repository.SubscriptionRepository;
import com.POS_system_backend.service.PlanMappingService;
import com.POS_system_backend.service.RazorpaySubscriptionService;
import com.razorpay.RazorpayClient;
import com.razorpay.Subscription;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class RazorpaySubscriptionServiceImpl implements RazorpaySubscriptionService {

    private final RazorpayClient razorpayClient;
    private final PlanMappingService planMappingService;
    private final SubscriptionRepository subscriptionRepository;

    public RazorpaySubscriptionServiceImpl(
            RazorpayClient razorpayClient,
            PlanMappingService planMappingService,
            SubscriptionRepository subscriptionRepository
    ) {
        this.razorpayClient = razorpayClient;
        this.planMappingService = planMappingService;
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public String createSubscription(PlanType plan) throws Exception {

        String planId = planMappingService.getPlanId(plan);

        JSONObject request = new JSONObject();
        request.put("plan_id", planId);
        request.put("total_count", 12); // 12 months
        request.put("customer_notify", 1);

        Subscription subscription =
                razorpayClient.subscriptions.create(request);
        
        String subId = subscription.get("id");

        // Save initial subscription state to DB
        com.POS_system_backend.entity.Subscription dbSub = new com.POS_system_backend.entity.Subscription();
        dbSub.setRazorpaySubscriptionId(subId);
        dbSub.setPlanType(plan);
        dbSub.setStatus(SubscriptionStatus.CREATED);
        // Note: userId needs to be passed or retrieved from context. 
        // For now, setting a placeholder or assuming it will be updated later.
        // Ideally, createSubscription should take userId as a parameter.
        dbSub.setUserId(1L); // Placeholder, should be updated
        
        subscriptionRepository.save(dbSub);

        return subId;
    }
}
