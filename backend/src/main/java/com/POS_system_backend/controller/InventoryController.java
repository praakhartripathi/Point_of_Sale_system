package com.POS_system_backend.controller;

import com.POS_system_backend.dto.InventoryDto;
import com.POS_system_backend.service.InventoryService;
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
@RequestMapping("/api/inventory")
@Tag(name = "Inventory Controller", description = "Endpoints for managing inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @Operation(summary = "Add inventory", description = "Adds new inventory for a product in a branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Inventory added successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<InventoryDto> addInventory(@RequestBody InventoryDto inventoryDto) {
        InventoryDto createdInventory = inventoryService.addInventory(inventoryDto);
        return new ResponseEntity<>(createdInventory, HttpStatus.CREATED);
    }

    @Operation(summary = "Update inventory", description = "Updates existing inventory by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Inventory updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryDto.class))),
        @ApiResponse(responseCode = "404", description = "Inventory not found", content = @Content)
    })
    @PutMapping("/{inventoryId}")
    public ResponseEntity<InventoryDto> updateInventory(@PathVariable Long inventoryId, @RequestBody InventoryDto inventoryDto) {
        InventoryDto updatedInventory = inventoryService.updateInventory(inventoryId, inventoryDto);
        return new ResponseEntity<>(updatedInventory, HttpStatus.OK);
    }

    @Operation(summary = "Delete inventory", description = "Deletes an inventory record by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Inventory deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Inventory not found", content = @Content)
    })
    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<String> deleteInventory(@PathVariable Long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
        return new ResponseEntity<>("Inventory deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get inventory by branch ID", description = "Retrieves all inventory items for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved inventory list",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryDto.class)))
    })
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<InventoryDto>> getInventoryByBranchId(@PathVariable Long branchId) {
        List<InventoryDto> inventory = inventoryService.getInventoryByBranchId(branchId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @Operation(summary = "Search inventory by product name", description = "Searches inventory in a branch by product name.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved search results",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryDto.class)))
    })
    @GetMapping("/branch/{branchId}/search")
    public ResponseEntity<List<InventoryDto>> searchInventoryByProductName(@PathVariable Long branchId, @RequestParam String productName) {
        List<InventoryDto> inventory = inventoryService.searchInventoryByProductName(branchId, productName);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @Operation(summary = "Get inventory by branch and product ID", description = "Retrieves specific inventory item for a product in a branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved inventory item",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = InventoryDto.class))),
        @ApiResponse(responseCode = "404", description = "Inventory not found", content = @Content)
    })
    @GetMapping("/branch/{branchId}/product/{productId}")
    public ResponseEntity<InventoryDto> getInventoryByBranchIdAndProductId(@PathVariable Long branchId, @PathVariable Long productId) {
        InventoryDto inventory = inventoryService.getInventoryByBranchIdAndProductId(branchId, productId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }
}
