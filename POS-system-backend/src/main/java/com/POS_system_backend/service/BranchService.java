package com.POS_system_backend.service;

import com.POS_system_backend.dto.BranchDto;

import java.util.List;

public interface BranchService {
    BranchDto createBranch(BranchDto branchDto);

    BranchDto updateBranch(Long branchId, BranchDto branchDto);

    void deleteBranch(Long branchId);

    List<BranchDto> getBranchesByStoreId(Long storeId);

    BranchDto getBranchById(Long branchId);
}
