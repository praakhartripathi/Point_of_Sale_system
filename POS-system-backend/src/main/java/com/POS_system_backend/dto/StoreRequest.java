package com.POS_system_backend.dto;

import com.POS_system_backend.entity.StoreContact;
import com.POS_system_backend.entity.enums.DemoStatus;
import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.StoreType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreRequest {
    private String brand;
    private String description;
    private StoreType storeType;
    private StoreStatus status;
    private StoreContact contact;

    @Entity
    @Data
    @Table(name = "demo_requests")
    public static class DemoRequest {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String fullName;
        private String email;
        private String companyName;
        private String phone;

        @Enumerated(EnumType.STRING)
        private DemoStatus status = DemoStatus.PENDING;

        private String notes; // Added for admin comments on approval/rejection

        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime updatedAt = LocalDateTime.now();
    }
}
