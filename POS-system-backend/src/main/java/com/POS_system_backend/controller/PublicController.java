package com.POS_system_backend.controller;

import com.POS_system_backend.entity.DemoRequest;
import com.POS_system_backend.service.DemoRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private DemoRequestService demoRequestService;

    @PostMapping("/demo-request")
    public ResponseEntity<DemoRequest> submitDemoRequest(@RequestBody DemoRequest demoRequest) {
        DemoRequest createdRequest = demoRequestService.createDemoRequest(demoRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }
}
