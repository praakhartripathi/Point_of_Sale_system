package com.POS_system_backend.service;

import com.POS_system_backend.entity.DemoRequest;
import java.util.List;

public interface DemoRequestService {
    DemoRequest createDemoRequest(DemoRequest demoRequest);
    List<DemoRequest> getAllDemoRequests();
    void approveDemoRequest(Long id, String notes);
    void rejectDemoRequest(Long id, String notes);
}
