package com.POS_system_backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryTest {

    @Test
    void testCategoryEntity() {
        Category category = new Category();
        category.setId(1L);
        category.setName("Electronics");
        category.setDescription("Gadgets");

        assertEquals(1L, category.getId());
        assertEquals("Electronics", category.getName());
        assertEquals("Gadgets", category.getDescription());
    }

    @Test
    void testPrePersist() {
        Category category = new Category();
        category.onCreate();
        assertNotNull(category.getCreatedAt());
        assertNotNull(category.getUpdatedAt());
    }

    @Test
    void testPreUpdate() {
        Category category = new Category();
        category.onUpdate();
        assertNotNull(category.getUpdatedAt());
    }
}
