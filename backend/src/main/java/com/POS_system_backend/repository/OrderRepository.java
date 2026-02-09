package com.POS_system_backend.repository;

import com.POS_system_backend.entity.Order;
import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBranchId(Long branchId);

    List<Order> findByCashierId(Long cashierId);

    List<Order> findByCustomerId(Long customerId);

    @Query("SELECT o FROM Order o WHERE o.branch.id = :branchId " +
        "AND (:customerId IS NULL OR o.customer.id = :customerId) " +
        "AND (:cashierId IS NULL OR o.cashier.id = :cashierId) " +
        "AND (:orderStatus IS NULL OR o.orderStatus = :orderStatus) " +
        "AND (:paymentStatus IS NULL OR o.paymentStatus = :paymentStatus)")
    List<Order> findOrdersByBranchIdAndFilters(
        @Param("branchId") Long branchId,
        @Param("customerId") Long customerId,
        @Param("cashierId") Long cashierId,
        @Param("orderStatus") OrderStatus orderStatus,
        @Param("paymentStatus") PaymentStatus paymentStatus);

    @Query("SELECT o FROM Order o WHERE o.branch.id = :branchId AND o.createdAt BETWEEN :startDate AND :endDate")
    List<Order> findOrdersByBranchIdAndDateRange(
        @Param("branchId") Long branchId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate);

    @Query("SELECT o FROM Order o WHERE o.branch.id = :branchId ORDER BY o.totalAmount DESC")
    List<Order> findTopOrdersByBranchId(@Param("branchId") Long branchId, Pageable pageable);
}
