package com.POS_system_backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    void testProductEntity() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Test Product");
        product.setSku("SKU123");
        product.setDescription("Description");
        product.setMrp(100.0);
        product.setSellingPrice(90.0);
        product.setBrand("Brand");
        product.setImage("image.jpg");

        assertEquals(1L, product.getId());
        assertEquals("Test Product", product.getName());
        assertEquals("SKU123", product.getSku());
        assertEquals("Description", product.getDescription());
        assertEquals(100.0, product.getMrp());
        assertEquals(90.0, product.getSellingPrice());
        assertEquals("Brand", product.getBrand());
        assertEquals("image.jpg", product.getImage());
    }

    @Test
    void testPrePersist() {
        Product product = new Product();
        product.onCreate();
        assertNotNull(product.getCreatedAt());
        assertNotNull(product.getUpdatedAt());
    }

    @Test
    void testPreUpdate() {
        Product product = new Product();
        product.onUpdate();
        assertNotNull(product.getUpdatedAt());
    }
}
