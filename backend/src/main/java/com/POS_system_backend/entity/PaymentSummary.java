package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment_summaries")
public class PaymentSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private double totalAmount;

    private int transactionCount;

    private double percentage;

    @ManyToOne
    @JoinColumn(name = "shift_report_id")
    private ShiftReport shiftReport;
}
