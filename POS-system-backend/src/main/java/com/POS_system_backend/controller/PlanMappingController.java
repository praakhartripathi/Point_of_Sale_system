package com.POS_system_backend.controller;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.service.PlanMappingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlanMappingController {

    private final PlanMappingService planMappingService;

    public PlanMappingController(PlanMappingService planMappingService) {
        this.planMappingService = planMappingService;
    }

    @GetMapping("/{planType}")
    public ResponseEntity<String> getPlanId(@PathVariable PlanType planType) {
        String planId = planMappingService.getPlanId(planType);
        return ResponseEntity.ok(planId);
    }
}
