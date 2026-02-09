package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.BranchDto;
import com.POS_system_backend.entity.Branch;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.mapper.BranchMapper;
import com.POS_system_backend.repository.BranchRepository;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BranchServiceImplTest {

    @InjectMocks
    private BranchServiceImpl branchService;

    @Mock
    private BranchRepository branchRepository;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BranchMapper branchMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBranch_Success() {
        BranchDto branchDto = new BranchDto();
        branchDto.setName("Test Branch");
        branchDto.setStoreId(1L);
        branchDto.setManagerId(1L);

        Branch branch = new Branch();
        branch.setName("Test Branch");

        Store store = new Store();
        store.setId(1L);

        User manager = new User();
        manager.setId(1L);

        when(branchMapper.toEntity(branchDto)).thenReturn(branch);
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(userRepository.findById(1L)).thenReturn(Optional.of(manager));
        when(branchRepository.save(any(Branch.class))).thenReturn(branch);
        when(branchMapper.toDto(any(Branch.class))).thenReturn(branchDto);

        BranchDto createdBranch = branchService.createBranch(branchDto);

        assertNotNull(createdBranch);
        assertEquals("Test Branch", createdBranch.getName());
        verify(branchRepository, times(1)).save(branch);
    }

    @Test
    void updateBranch_Success() {
        Long branchId = 1L;
        BranchDto branchDto = new BranchDto();
        branchDto.setName("Updated Branch");

        Branch existingBranch = new Branch();
        existingBranch.setId(branchId);
        existingBranch.setName("Old Branch");

        when(branchRepository.findById(branchId)).thenReturn(Optional.of(existingBranch));
        when(branchRepository.save(any(Branch.class))).thenReturn(existingBranch);
        when(branchMapper.toDto(any(Branch.class))).thenReturn(branchDto);

        BranchDto updatedBranch = branchService.updateBranch(branchId, branchDto);

        assertNotNull(updatedBranch);
        assertEquals("Updated Branch", updatedBranch.getName());
        verify(branchRepository, times(1)).save(existingBranch);
    }

    @Test
    void deleteBranch_Success() {
        Long branchId = 1L;
        when(branchRepository.existsById(branchId)).thenReturn(true);

        branchService.deleteBranch(branchId);

        verify(branchRepository, times(1)).deleteById(branchId);
    }

    @Test
    void getBranchesByStoreId_Success() {
        Long storeId = 1L;
        List<Branch> branches = new ArrayList<>();
        branches.add(new Branch());

        when(branchRepository.findByStoreId(storeId)).thenReturn(branches);
        when(branchMapper.toDto(any(Branch.class))).thenReturn(new BranchDto());

        List<BranchDto> result = branchService.getBranchesByStoreId(storeId);

        assertNotNull(result);
        assertEquals(1, result.size());
    }
}
