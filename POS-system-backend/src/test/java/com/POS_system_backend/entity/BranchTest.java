package com.POS_system_backend.entity;

import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class BranchTest {

    @Test
    void testBranchEntity() {
        Branch branch = new Branch();
        branch.setId(1L);
        branch.setName("Main Branch");
        branch.setAddress("123 Main St");
        branch.setPhone("555-1234");
        branch.setEmail("branch@test.com");
        branch.setWorkingDays(Arrays.asList("Monday", "Tuesday"));
        branch.setOpenTime(LocalTime.of(9, 0));
        branch.setCloseTime(LocalTime.of(18, 0));

        assertEquals(1L, branch.getId());
        assertEquals("Main Branch", branch.getName());
        assertEquals("123 Main St", branch.getAddress());
        assertEquals("555-1234", branch.getPhone());
        assertEquals("branch@test.com", branch.getEmail());
        assertEquals(2, branch.getWorkingDays().size());
        assertEquals(LocalTime.of(9, 0), branch.getOpenTime());
        assertEquals(LocalTime.of(18, 0), branch.getCloseTime());
    }

    @Test
    void testPrePersist() {
        Branch branch = new Branch();
        branch.onCreate();
        assertNotNull(branch.getCreatedAt());
        assertNotNull(branch.getUpdatedAt());
    }

    @Test
    void testPreUpdate() {
        Branch branch = new Branch();
        branch.onUpdate();
        assertNotNull(branch.getUpdatedAt());
    }
}
