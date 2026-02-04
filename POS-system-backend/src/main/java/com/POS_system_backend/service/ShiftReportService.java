package com.POS_system_backend.service;

import com.POS_system_backend.entity.ShiftReport;

import java.time.LocalDate;
import java.util.List;

public interface ShiftReportService {
    ShiftReport startShift(Long cashierId, Long branchId);

    ShiftReport endShift(Long shiftReportId);

    ShiftReport getShiftReportById(Long shiftReportId);

    List<ShiftReport> getAllShiftReports();

    List<ShiftReport> getShiftReportsByBranchId(Long branchId);

    List<ShiftReport> getShiftReportsByCashierId(Long cashierId);

    ShiftReport getCurrentShiftProgress(Long cashierId);

    List<ShiftReport> getShiftReportsByCashierAndDate(Long cashierId, LocalDate date);
}
