package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.StoreType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StoreTest {

    @Test
    void testStoreEntity() {
        Store store = new Store();
        store.setId(1L);
        store.setBrand("MyBrand");
        store.setDescription("Best Store");
        store.setStoreType(StoreType.RETAIL);
        store.setStatus(StoreStatus.ACTIVE);

        assertEquals(1L, store.getId());
        assertEquals("MyBrand", store.getBrand());
        assertEquals("Best Store", store.getDescription());
        assertEquals(StoreType.RETAIL, store.getStoreType());
        assertEquals(StoreStatus.ACTIVE, store.getStatus());
    }

    @Test
    void testPrePersist() {
        Store store = new Store();
        store.onCreate();
        assertNotNull(store.getCreatedAt());
        assertNotNull(store.getUpdatedAt());
        assertEquals(StoreStatus.INACTIVE, store.getStatus()); // Default status
    }

    @Test
    void testPreUpdate() {
        Store store = new Store();
        store.onUpdate();
        assertNotNull(store.getUpdatedAt());
    }
}
