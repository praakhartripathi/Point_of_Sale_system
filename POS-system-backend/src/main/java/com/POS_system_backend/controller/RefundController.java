package com.POS_system_backend.controller;

import com.POS_system_backend.dto.RefundDto;
import com.POS_system_backend.service.RefundService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refunds")
@Tag(name = "Refund Controller", description = "Endpoints for managing refunds")
public class RefundController {

    @Autowired
    private RefundService refundService;

    @Operation(summary = "Create a refund", description = "Creates a new refund for an order.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Refund created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<RefundDto> createRefund(@RequestBody RefundDto refundDto) {
        RefundDto createdRefund = refundService.createRefund(refundDto);
        return new ResponseEntity<>(createdRefund, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all refunds", description = "Retrieves a list of all refunds.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of refunds", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class)))
    })
    @GetMapping
    public ResponseEntity<List<RefundDto>> getAllRefunds() {
        List<RefundDto> refunds = refundService.getAllRefunds();
        return new ResponseEntity<>(refunds, HttpStatus.OK);
    }

    @Operation(summary = "Get refunds by cashier ID", description = "Retrieves all refunds processed by a specific cashier.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of refunds", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class)))
    })
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDto>> getRefundsByCashierId(@PathVariable Long cashierId) {
        List<RefundDto> refunds = refundService.getRefundsByCashierId(cashierId);
        return new ResponseEntity<>(refunds, HttpStatus.OK);
    }

    @Operation(summary = "Get refunds by shift report ID", description = "Retrieves all refunds associated with a specific shift report.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of refunds", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class)))
    })
    @GetMapping("/shift-report/{shiftReportId}")
    public ResponseEntity<List<RefundDto>> getRefundsByShiftReportId(@PathVariable Long shiftReportId) {
        List<RefundDto> refunds = refundService.getRefundsByShiftReportId(shiftReportId);
        return new ResponseEntity<>(refunds, HttpStatus.OK);
    }

    @Operation(summary = "Get refunds by branch ID", description = "Retrieves all refunds for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of refunds", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class)))
    })
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDto>> getRefundsByBranchId(@PathVariable Long branchId) {
        List<RefundDto> refunds = refundService.getRefundsByBranchId(branchId);
        return new ResponseEntity<>(refunds, HttpStatus.OK);
    }

    @Operation(summary = "Get refund by ID", description = "Retrieves details of a specific refund.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved refund details", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = RefundDto.class))),
        @ApiResponse(responseCode = "404", description = "Refund not found", content = @Content)
    })
    @GetMapping("/{refundId}")
    public ResponseEntity<RefundDto> getRefundById(@PathVariable Long refundId) {
        RefundDto refund = refundService.getRefundById(refundId);
        return new ResponseEntity<>(refund, HttpStatus.OK);
    }

    @Operation(summary = "Delete a refund", description = "Deletes a refund by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Refund deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Refund not found", content = @Content)
    })
    @DeleteMapping("/{refundId}")
    public ResponseEntity<String> deleteRefund(@PathVariable Long refundId) {
        refundService.deleteRefund(refundId);
        return new ResponseEntity<>("Refund deleted successfully", HttpStatus.OK);
    }
}
