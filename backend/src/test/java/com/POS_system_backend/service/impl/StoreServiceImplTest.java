package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.StoreDto;
import com.POS_system_backend.dto.StoreRequest;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.mapper.StoreMapper;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class StoreServiceImplTest {

    @InjectMocks
    private StoreServiceImpl storeService;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private StoreMapper storeMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createStore_Success() {
        StoreRequest request = new StoreRequest();
        request.setBrand("Test Brand");
        // request.setStoreAdminEmail("admin@test.com"); // Removed as it's not in StoreRequest

        User admin = new User();
        admin.setEmail("admin@test.com");

        Store store = new Store();
        store.setBrand("Test Brand");

        StoreDto storeDto = new StoreDto();
        storeDto.setBrand("Test Brand");

        // when(userRepository.findByEmail("admin@test.com")).thenReturn(Optional.of(admin)); // Not needed if we pass user directly
        when(storeRepository.save(any(Store.class))).thenReturn(store);
        // when(storeMapper.toDto(any(Store.class))).thenReturn(storeDto); // StoreService returns Store, not DTO currently

        Store createdStore = storeService.createStore(request, admin);

        assertNotNull(createdStore);
        assertEquals("Test Brand", createdStore.getBrand());
        verify(storeRepository, times(1)).save(any(Store.class));
    }
}
