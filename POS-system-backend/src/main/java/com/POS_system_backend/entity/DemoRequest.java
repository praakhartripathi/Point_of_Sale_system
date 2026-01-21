package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.DemoStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "demo_requests")
public class DemoRequest {
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
