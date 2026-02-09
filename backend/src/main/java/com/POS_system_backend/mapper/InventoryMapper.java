package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.InventoryDto;
import com.POS_system_backend.entity.Inventory;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public InventoryDto toDto(Inventory inventory) {
        if (inventory == null) {
            return null;
        }
        InventoryDto dto = new InventoryDto();
        dto.setId(inventory.getId());
        dto.setQuantity(inventory.getQuantity());
        dto.setLastUpdated(inventory.getLastUpdated());
        if (inventory.getBranch() != null) {
            dto.setBranchId(inventory.getBranch().getId());
        }
        if (inventory.getProduct() != null) {
            dto.setProductId(inventory.getProduct().getId());
        }
        return dto;
    }

    public Inventory toEntity(InventoryDto dto) {
        if (dto == null) {
            return null;
        }
        Inventory inventory = new Inventory();
        inventory.setId(dto.getId());
        inventory.setQuantity(dto.getQuantity());
        return inventory;
    }
}
