package com.POS_system_backend.repository;

import com.POS_system_backend.entity.ShiftReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShiftReportRepository extends JpaRepository<ShiftReport, Long> {
    List<ShiftReport> findByBranchId(Long branchId);

    List<ShiftReport> findByCashierId(Long cashierId);

    @Query("SELECT s FROM ShiftReport s WHERE s.cashier.id = :cashierId AND s.endTime IS NULL")
    Optional<ShiftReport> findCurrentShiftByCashierId(@Param("cashierId") Long cashierId);

    @Query("SELECT s FROM ShiftReport s WHERE s.cashier.id = :cashierId AND s.startTime BETWEEN :startDate AND :endDate")
    List<ShiftReport> findByCashierIdAndDateRange(@Param("cashierId") Long cashierId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
