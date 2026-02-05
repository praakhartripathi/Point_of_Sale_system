package com.POS_system_backend.controller;

import com.POS_system_backend.dto.BranchDto;
import com.POS_system_backend.service.BranchService;
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
@RequestMapping("/api/branches")
@Tag(name = "Branch Controller", description = "Endpoints for managing store branches")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @Operation(summary = "Create a new branch", description = "Creates a new branch for a store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Branch created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = BranchDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<BranchDto> createBranch(@RequestBody BranchDto branchDto) {
        BranchDto createdBranch = branchService.createBranch(branchDto);
        return new ResponseEntity<>(createdBranch, HttpStatus.CREATED);
    }

    @Operation(summary = "Update a branch", description = "Updates an existing branch by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Branch updated successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = BranchDto.class))),
        @ApiResponse(responseCode = "404", description = "Branch not found", content = @Content)
    })
    @PutMapping("/{branchId}")
    public ResponseEntity<BranchDto> updateBranch(@PathVariable Long branchId, @RequestBody BranchDto branchDto) {
        BranchDto updatedBranch = branchService.updateBranch(branchId, branchDto);
        return new ResponseEntity<>(updatedBranch, HttpStatus.OK);
    }

    @Operation(summary = "Delete a branch", description = "Deletes a branch by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Branch deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Branch not found", content = @Content)
    })
    @DeleteMapping("/{branchId}")
    public ResponseEntity<String> deleteBranch(@PathVariable Long branchId) {
        branchService.deleteBranch(branchId);
        return new ResponseEntity<>("Branch deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get branches by store ID", description = "Retrieves all branches associated with a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of branches", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = BranchDto.class)))
    })
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<BranchDto>> getBranchesByStoreId(@PathVariable Long storeId) {
        List<BranchDto> branches = branchService.getBranchesByStoreId(storeId);
        return new ResponseEntity<>(branches, HttpStatus.OK);
    }

    @Operation(summary = "Get branch by ID", description = "Retrieves details of a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved branch details", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = BranchDto.class))),
        @ApiResponse(responseCode = "404", description = "Branch not found", content = @Content)
    })
    @GetMapping("/{branchId}")
    public ResponseEntity<BranchDto> getBranchById(@PathVariable Long branchId) {
        BranchDto branch = branchService.getBranchById(branchId);
        return new ResponseEntity<>(branch, HttpStatus.OK);
    }
}
