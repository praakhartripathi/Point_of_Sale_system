package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.DemoRequest;
import com.POS_system_backend.entity.enums.DemoStatus;
import com.POS_system_backend.repository.DemoRequestRepository;
import com.POS_system_backend.service.DemoRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemoRequestServiceImpl implements DemoRequestService {

    @Autowired
    private DemoRequestRepository demoRequestRepository;

    @Override
    public DemoRequest createDemoRequest(DemoRequest demoRequest) {
        return demoRequestRepository.save(demoRequest);
    }

    @Override
    public List<DemoRequest> getAllDemoRequests() {
        return demoRequestRepository.findAll();
    }

    @Override
    public void approveDemoRequest(Long id, String notes) {
        DemoRequest request = demoRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demo request not found"));
        request.setStatus(DemoStatus.APPROVED);
        request.setNotes(notes);
        demoRequestRepository.save(request);
        
        // Option 1: Manual Trial Creation (Just mark as approved)
        // In a real scenario, you might trigger an email here or create a trial account.
    }

    @Override
    public void rejectDemoRequest(Long id, String notes) {
        DemoRequest request = demoRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demo request not found"));
        request.setStatus(DemoStatus.REJECTED);
        request.setNotes(notes);
        demoRequestRepository.save(request);
    }
}
