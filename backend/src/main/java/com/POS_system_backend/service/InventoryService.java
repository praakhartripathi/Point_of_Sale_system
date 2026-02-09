package com.POS_system_backend.service;

import com.POS_system_backend.dto.InventoryDto;

import java.util.List;

public interface InventoryService {
    InventoryDto addInventory(InventoryDto inventoryDto);

    InventoryDto updateInventory(Long inventoryId, InventoryDto inventoryDto);

    void deleteInventory(Long inventoryId);

    List<InventoryDto> getInventoryByBranchId(Long branchId);

    List<InventoryDto> searchInventoryByProductName(Long branchId, String productName);

    InventoryDto getInventoryByBranchIdAndProductId(Long branchId, Long productId);
}
