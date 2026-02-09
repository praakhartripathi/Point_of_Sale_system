package com.POS_system_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shift_reports")
public class ShiftReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cashier_id")
    private User cashier;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private double totalSales;

    private double totalRefunds;

    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
    private List<PaymentSummary> paymentSummaries = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "shift_report_top_selling_products",
        joinColumns = @JoinColumn(name = "shift_report_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> topSellingProducts = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> recentOrders = new ArrayList<>();

    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
    private List<Refund> refunds = new ArrayList<>();

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
