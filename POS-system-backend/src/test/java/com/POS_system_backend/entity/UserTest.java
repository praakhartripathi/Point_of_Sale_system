package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.UserRole;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testUserGetterAndSetter() {
        User user = new User();
        Long id = 1L;
        String fullName = "John Doe";
        String email = "john@example.com";
        String password = "password123";
        String phone = "1234567890";
        UserRole role = UserRole.ROLE_USER;
        LocalDateTime now = LocalDateTime.now();

        user.setId(id);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhone(phone);
        user.setRole(role);
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        user.setLastLoginAt(now);

        assertEquals(id, user.getId());
        assertEquals(fullName, user.getFullName());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(phone, user.getPhone());
        assertEquals(role, user.getRole());
        assertEquals(now, user.getCreatedAt());
        assertEquals(now, user.getUpdatedAt());
        assertEquals(now, user.getLastLoginAt());
    }

    @Test
    void testUserAllArgsConstructor() {
        Long id = 1L;
        String fullName = "John Doe";
        String email = "john@example.com";
        String password = "password123";
        String phone = "1234567890";
        UserRole role = UserRole.ROLE_USER;
        LocalDateTime now = LocalDateTime.now();

        User user = new User(id, fullName, email, password, phone, role, now, now, now);

        assertEquals(id, user.getId());
        assertEquals(fullName, user.getFullName());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(phone, user.getPhone());
        assertEquals(role, user.getRole());
        assertEquals(now, user.getCreatedAt());
        assertEquals(now, user.getUpdatedAt());
        assertEquals(now, user.getLastLoginAt());
    }

    @Test
    void testUserNoArgsConstructor() {
        User user = new User();
        assertNotNull(user);
    }

    @Test
    void testEqualsAndHashCode() {
        User user1 = new User(1L, "John", "john@test.com", "pass", "123", UserRole.ROLE_USER, null, null, null);
        User user2 = new User(1L, "John", "john@test.com", "pass", "123", UserRole.ROLE_USER, null, null, null);
        User user3 = new User(2L, "Jane", "jane@test.com", "pass", "456", UserRole.ROLE_ADMIN, null, null, null);

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
        assertEquals(user1.hashCode(), user2.hashCode());
        assertNotEquals(user1.hashCode(), user3.hashCode());
    }
}
