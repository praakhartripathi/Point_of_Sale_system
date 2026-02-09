package com.POS_system_backend.controller;

import com.POS_system_backend.entity.ShiftReport;
import com.POS_system_backend.service.ShiftReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shift-reports")
@Tag(name = "Shift Report Controller", description = "Endpoints for managing cashier shifts")
public class ShiftReportController {

    @Autowired
    private ShiftReportService shiftReportService;

    @Operation(summary = "Start a shift", description = "Starts a new shift for a cashier at a branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Shift started successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping("/start")
    public ResponseEntity<ShiftReport> startShift(@RequestParam Long cashierId, @RequestParam Long branchId) {
        ShiftReport shiftReport = shiftReportService.startShift(cashierId, branchId);
        return ResponseEntity.ok(shiftReport);
    }

    @Operation(summary = "End a shift", description = "Ends an active shift by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Shift ended successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class))),
        @ApiResponse(responseCode = "404", description = "Shift report not found", content = @Content)
    })
    @PostMapping("/{id}/end")
    public ResponseEntity<ShiftReport> endShift(@PathVariable Long id) {
        ShiftReport shiftReport = shiftReportService.endShift(id);
        return ResponseEntity.ok(shiftReport);
    }

    @Operation(summary = "Get shift report by ID", description = "Retrieves details of a specific shift report.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved shift report",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class))),
        @ApiResponse(responseCode = "404", description = "Shift report not found", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<ShiftReport> getShiftReportById(@PathVariable Long id) {
        ShiftReport shiftReport = shiftReportService.getShiftReportById(id);
        return ResponseEntity.ok(shiftReport);
    }

    @Operation(summary = "Get all shift reports", description = "Retrieves a list of all shift reports.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of shift reports",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class)))
    })
    @GetMapping
    public ResponseEntity<List<ShiftReport>> getAllShiftReports() {
        List<ShiftReport> shiftReports = shiftReportService.getAllShiftReports();
        return ResponseEntity.ok(shiftReports);
    }

    @Operation(summary = "Get shift reports by branch ID", description = "Retrieves all shift reports for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of shift reports",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class)))
    })
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByBranchId(@PathVariable Long branchId) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByBranchId(branchId);
        return ResponseEntity.ok(shiftReports);
    }

    @Operation(summary = "Get shift reports by cashier ID", description = "Retrieves all shift reports for a specific cashier.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of shift reports",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class)))
    })
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByCashierId(@PathVariable Long cashierId) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByCashierId(cashierId);
        return ResponseEntity.ok(shiftReports);
    }

    @Operation(summary = "Get current shift progress", description = "Retrieves the current active shift for a cashier.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved current shift progress",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class))),
        @ApiResponse(responseCode = "404", description = "No active shift found", content = @Content)
    })
    @GetMapping("/current-progress/{cashierId}")
    public ResponseEntity<ShiftReport> getCurrentShiftProgress(@PathVariable Long cashierId) {
        ShiftReport shiftReport = shiftReportService.getCurrentShiftProgress(cashierId);
        return ResponseEntity.ok(shiftReport);
    }

    @Operation(summary = "Get shift reports by cashier and date", description = "Retrieves shift reports for a cashier on a specific date.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of shift reports",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ShiftReport.class)))
    })
    @GetMapping("/cashier/{cashierId}/date")
    public ResponseEntity<List<ShiftReport>> getShiftReportsByCashierAndDate(
        @PathVariable Long cashierId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<ShiftReport> shiftReports = shiftReportService.getShiftReportsByCashierAndDate(cashierId, date);
        return ResponseEntity.ok(shiftReports);
    }
}
