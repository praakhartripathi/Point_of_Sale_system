package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.*;
import com.POS_system_backend.entity.enums.PaymentType;
import com.POS_system_backend.repository.*;
import com.POS_system_backend.service.ShiftReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ShiftReportServiceImpl implements ShiftReportService {

    @Autowired
    private ShiftReportRepository shiftReportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RefundRepository refundRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ShiftReport startShift(Long cashierId, Long branchId) {
        User cashier = userRepository.findById(cashierId)
            .orElseThrow(() -> new RuntimeException("Cashier not found"));
        Branch branch = branchRepository.findById(branchId)
            .orElseThrow(() -> new RuntimeException("Branch not found"));

        ShiftReport shiftReport = new ShiftReport();
        shiftReport.setCashier(cashier);
        shiftReport.setBranch(branch);
        shiftReport.setStartTime(LocalDateTime.now());

        return shiftReportRepository.save(shiftReport);
    }

    @Override
    public ShiftReport endShift(Long shiftReportId) {
        ShiftReport shiftReport = shiftReportRepository.findById(shiftReportId)
            .orElseThrow(() -> new RuntimeException("Shift report not found"));

        if (shiftReport.getEndTime() != null) {
            throw new RuntimeException("Shift already ended");
        }

        shiftReport.setEndTime(LocalDateTime.now());

        // Calculate totals based on orders and refunds during the shift
        List<Order> orders = orderRepository.findOrdersByBranchIdAndDateRange(
            shiftReport.getBranch().getId(),
            shiftReport.getStartTime(),
            shiftReport.getEndTime()
        ).stream().filter(o -> o.getCashier().getId().equals(shiftReport.getCashier().getId())).collect(Collectors.toList());

        double totalSales = orders.stream().mapToDouble(Order::getTotalAmount).sum();
        shiftReport.setTotalSales(totalSales);

        // Calculate refunds
        List<Refund> refunds = refundRepository.findByCashierId(shiftReport.getCashier().getId())
            .stream()
            .filter(r -> r.getCreatedAt().isAfter(shiftReport.getStartTime()) && r.getCreatedAt().isBefore(shiftReport.getEndTime()))
            .collect(Collectors.toList());

        double totalRefunds = refunds.stream().mapToDouble(Refund::getAmount).sum();
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setRefunds(refunds);

        // Payment Summaries
        // Since Order entity doesn't have PaymentType, we will skip populating paymentSummaries for now or leave it empty.
        // If needed, we would need to update Order entity to include PaymentType.

        // Populate recent orders
        List<Order> recentOrders = orders.stream()
            .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
            .limit(10)
            .collect(Collectors.toList());
        shiftReport.setRecentOrders(recentOrders);

        // Top selling products
        Map<Long, Integer> productSalesCount = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                if (item.getProductId() != null) {
                    productSalesCount.put(item.getProductId(), productSalesCount.getOrDefault(item.getProductId(), 0) + item.getQuantity());
                }
            }
        }

        List<Product> topSelling = productSalesCount.entrySet().stream()
            .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
            .limit(5)
            .map(entry -> productRepository.findById(entry.getKey()).orElse(null))
            .filter(product -> product != null)
            .collect(Collectors.toList());
        shiftReport.setTopSellingProducts(topSelling);

        return shiftReportRepository.save(shiftReport);
    }

    @Override
    public ShiftReport getShiftReportById(Long shiftReportId) {
        return shiftReportRepository.findById(shiftReportId)
            .orElseThrow(() -> new RuntimeException("Shift report not found"));
    }

    @Override
    public List<ShiftReport> getAllShiftReports() {
        return shiftReportRepository.findAll();
    }

    @Override
    public List<ShiftReport> getShiftReportsByBranchId(Long branchId) {
        return shiftReportRepository.findByBranchId(branchId);
    }

    @Override
    public List<ShiftReport> getShiftReportsByCashierId(Long cashierId) {
        return shiftReportRepository.findByCashierId(cashierId);
    }

    @Override
    public ShiftReport getCurrentShiftProgress(Long cashierId) {
        ShiftReport shiftReport = shiftReportRepository.findCurrentShiftByCashierId(cashierId)
            .orElseThrow(() -> new RuntimeException("No active shift found for this cashier"));

        // Calculate current progress (sales, refunds, etc.) without ending the shift
        LocalDateTime endTime = LocalDateTime.now();

        List<Order> orders = orderRepository.findOrdersByBranchIdAndDateRange(
            shiftReport.getBranch().getId(),
            shiftReport.getStartTime(),
            endTime
        ).stream().filter(o -> o.getCashier().getId().equals(shiftReport.getCashier().getId())).collect(Collectors.toList());

        double totalSales = orders.stream().mapToDouble(Order::getTotalAmount).sum();
        shiftReport.setTotalSales(totalSales);

        List<Refund> refunds = refundRepository.findByCashierId(shiftReport.getCashier().getId())
            .stream()
            .filter(r -> r.getCreatedAt().isAfter(shiftReport.getStartTime()) && r.getCreatedAt().isBefore(endTime))
            .collect(Collectors.toList());

        double totalRefunds = refunds.stream().mapToDouble(Refund::getAmount).sum();
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setRefunds(refunds);

        List<Order> recentOrders = orders.stream()
            .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
            .limit(10)
            .collect(Collectors.toList());
        shiftReport.setRecentOrders(recentOrders);

        Map<Long, Integer> productSalesCount = new HashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                if (item.getProductId() != null) {
                    productSalesCount.put(item.getProductId(), productSalesCount.getOrDefault(item.getProductId(), 0) + item.getQuantity());
                }
            }
        }

        List<Product> topSelling = productSalesCount.entrySet().stream()
            .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
            .limit(5)
            .map(entry -> productRepository.findById(entry.getKey()).orElse(null))
            .filter(product -> product != null)
            .collect(Collectors.toList());
        shiftReport.setTopSellingProducts(topSelling);

        return shiftReport;
    }

    @Override
    public List<ShiftReport> getShiftReportsByCashierAndDate(Long cashierId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return shiftReportRepository.findByCashierIdAndDateRange(cashierId, startOfDay, endOfDay);
    }
}
