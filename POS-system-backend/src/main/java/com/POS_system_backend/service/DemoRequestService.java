package com.POS_system_backend.service;

import com.POS_system_backend.dto.StoreRequest;

import java.util.List;

public interface DemoRequestService {
    StoreRequest.DemoRequest createDemoRequest(StoreRequest.DemoRequest demoRequest);
    List<StoreRequest.DemoRequest> getAllDemoRequests();
    void approveDemoRequest(Long id, String notes);
    void rejectDemoRequest(Long id, String notes);
}
