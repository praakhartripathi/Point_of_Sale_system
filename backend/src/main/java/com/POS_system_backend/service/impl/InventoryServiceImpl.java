package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.InventoryDto;
import com.POS_system_backend.entity.Branch;
import com.POS_system_backend.entity.Inventory;
import com.POS_system_backend.entity.Product;
import com.POS_system_backend.mapper.InventoryMapper;
import com.POS_system_backend.repository.BranchRepository;
import com.POS_system_backend.repository.InventoryRepository;
import com.POS_system_backend.repository.ProductRepository;
import com.POS_system_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryMapper inventoryMapper;

    @Override
    public InventoryDto addInventory(InventoryDto inventoryDto) {
        // Check if inventory already exists for this branch and product
        Optional<Inventory> existingInventory = inventoryRepository.findByBranchIdAndProductId(
            inventoryDto.getBranchId(), inventoryDto.getProductId());

        if (existingInventory.isPresent()) {
            throw new RuntimeException("Inventory already exists for this product in the branch. Use update instead.");
        }

        Inventory inventory = inventoryMapper.toEntity(inventoryDto);

        if (inventoryDto.getBranchId() != null) {
            Optional<Branch> branchOptional = branchRepository.findById(inventoryDto.getBranchId());
            if (branchOptional.isPresent()) {
                inventory.setBranch(branchOptional.get());
            } else {
                throw new RuntimeException("Branch not found with id: " + inventoryDto.getBranchId());
            }
        }

        if (inventoryDto.getProductId() != null) {
            Optional<Product> productOptional = productRepository.findById(inventoryDto.getProductId());
            if (productOptional.isPresent()) {
                inventory.setProduct(productOptional.get());
            } else {
                throw new RuntimeException("Product not found with id: " + inventoryDto.getProductId());
            }
        }

        Inventory savedInventory = inventoryRepository.save(inventory);
        return inventoryMapper.toDto(savedInventory);
    }

    @Override
    public InventoryDto updateInventory(Long inventoryId, InventoryDto inventoryDto) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(inventoryId);
        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();

            if (inventoryDto.getQuantity() != null) {
                inventory.setQuantity(inventoryDto.getQuantity());
            }

            // We typically don't update branch or product for an existing inventory record,
            // but if needed, logic can be added here.

            Inventory updatedInventory = inventoryRepository.save(inventory);
            return inventoryMapper.toDto(updatedInventory);
        } else {
            throw new RuntimeException("Inventory not found with id: " + inventoryId);
        }
    }

    @Override
    public void deleteInventory(Long inventoryId) {
        if (inventoryRepository.existsById(inventoryId)) {
            inventoryRepository.deleteById(inventoryId);
        } else {
            throw new RuntimeException("Inventory not found with id: " + inventoryId);
        }
    }

    @Override
    public List<InventoryDto> getInventoryByBranchId(Long branchId) {
        List<Inventory> inventories = inventoryRepository.findByBranchId(branchId);
        List<InventoryDto> inventoryDtos = new ArrayList<>();
        for (Inventory inventory : inventories) {
            inventoryDtos.add(inventoryMapper.toDto(inventory));
        }
        return inventoryDtos;
    }

    @Override
    public List<InventoryDto> searchInventoryByProductName(Long branchId, String productName) {
        List<Inventory> inventories = inventoryRepository.findByBranchIdAndProductName(branchId, productName);
        List<InventoryDto> inventoryDtos = new ArrayList<>();
        for (Inventory inventory : inventories) {
            inventoryDtos.add(inventoryMapper.toDto(inventory));
        }
        return inventoryDtos;
    }

    @Override
    public InventoryDto getInventoryByBranchIdAndProductId(Long branchId, Long productId) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findByBranchIdAndProductId(branchId, productId);
        if (inventoryOptional.isPresent()) {
            return inventoryMapper.toDto(inventoryOptional.get());
        } else {
            throw new RuntimeException("Inventory not found for branch id: " + branchId + " and product id: " + productId);
        }
    }
}
