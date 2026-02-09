package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.StoreDto;
import com.POS_system_backend.entity.Store;
import org.springframework.stereotype.Component;

@Component
public class StoreMapper {

    public StoreDto toDto(Store store) {
        if (store == null) {
            return null;
        }
        StoreDto dto = new StoreDto();
        dto.setId(store.getId());
        dto.setBrand(store.getBrand());
        if (store.getStoreAdmin() != null) {
            dto.setStoreAdminId(store.getStoreAdmin().getId());
        }
        dto.setDescription(store.getDescription());
        dto.setStoreType(store.getStoreType());
        dto.setStatus(store.getStatus());
        dto.setContact(store.getContact());
        dto.setCreatedAt(store.getCreatedAt());
        dto.setUpdatedAt(store.getUpdatedAt());
        return dto;
    }
}
