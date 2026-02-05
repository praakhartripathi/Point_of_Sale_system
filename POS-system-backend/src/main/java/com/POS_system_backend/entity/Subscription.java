package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.PlanType;
import com.POS_system_backend.entity.enums.SubscriptionStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Data
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    private PlanType planType;

    @Column(unique = true)
    private String razorpaySubscriptionId;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public boolean isActive() {
        return this.status == SubscriptionStatus.ACTIVE;
    }
}
