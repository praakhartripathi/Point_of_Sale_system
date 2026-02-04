package com.POS_system_backend.controller;

import com.POS_system_backend.entity.ShiftReport;
import com.POS_system_backend.service.ShiftReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shift-reports")
public class ShiftReportController {

    @Autowired
    private ShiftReportService shiftReportService;

    @PostMapping("/start")
    public ResponseEntity<ShiftReport> startShift(@RequestParam Long cashierId, @RequestParam Long branchId) {
        ShiftReport shiftReport = shiftReportService.startShift(cashierId, branchId);
        return ResponseEntity.ok(shiftReport);
    }

    @PostMapping("/{id}/end")
    public ResponseEntity<ShiftReport> endShift(@PathVariable Long id) {
        ShiftReport shiftReport = shiftReportService.endShift(id);
        return ResponseEntity.ok(shiftReport);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShiftReport> getShiftReportById(@PathVariable Long id) {
        ShiftReport shiftReport = shiftReportService.getShiftReportById(id);
        return ResponseEntity.ok(shiftReport);
    }

    @GetMapping
    public ResponseEntity<List<ShiftReport>> getAllShiftReports() {
        List<ShiftReport> shiftReports = shiftReportService.getAllShiftReports();
        return ResponseEntity.ok(shiftReports);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByBranchId(@PathVariable Long branchId) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByBranchId(branchId);
        return ResponseEntity.ok(shiftReports);
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByCashierId(@PathVariable Long cashierId) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByCashierId(cashierId);
        return ResponseEntity.ok(shiftReports);
    }

    @GetMapping("/current-progress/{cashierId}")
    public ResponseEntity<ShiftReport> getCurrentShiftProgress(@PathVariable Long cashierId) {
        ShiftReport shiftReport = shiftReportService.getCurrentShiftProgress(cashierId);
        return ResponseEntity.ok(shiftReport);
    }

    @GetMapping("/cashier/{cashierId}/date")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByCashierAndDate(
        @PathVariable Long cashierId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByCashierAndDate(cashierId, date);
        return ResponseEntity.ok(shiftReports);
    }
}
