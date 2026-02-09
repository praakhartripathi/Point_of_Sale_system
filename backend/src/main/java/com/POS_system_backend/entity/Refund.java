package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "refunds")
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String reason;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "shift_report_id")
    private ShiftReport shiftReport;

    @ManyToOne
    @JoinColumn(name = "cashier_id")
    private User cashier;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
