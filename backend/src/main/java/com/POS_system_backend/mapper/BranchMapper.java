package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.BranchDto;
import com.POS_system_backend.entity.Branch;
import org.springframework.stereotype.Component;

@Component
public class BranchMapper {

    public BranchDto toDto(Branch branch) {
        if (branch == null) {
            return null;
        }
        BranchDto dto = new BranchDto();
        dto.setId(branch.getId());
        dto.setName(branch.getName());
        dto.setAddress(branch.getAddress());
        dto.setPhone(branch.getPhone());
        dto.setEmail(branch.getEmail());
        dto.setWorkingDays(branch.getWorkingDays());
        dto.setOpenTime(branch.getOpenTime());
        dto.setCloseTime(branch.getCloseTime());
        if (branch.getStore() != null) {
            dto.setStoreId(branch.getStore().getId());
        }
        if (branch.getManager() != null) {
            dto.setManagerId(branch.getManager().getId());
        }
        return dto;
    }

    public Branch toEntity(BranchDto dto) {
        if (dto == null) {
            return null;
        }
        Branch branch = new Branch();
        branch.setId(dto.getId());
        branch.setName(dto.getName());
        branch.setAddress(dto.getAddress());
        branch.setPhone(dto.getPhone());
        branch.setEmail(dto.getEmail());
        branch.setWorkingDays(dto.getWorkingDays());
        branch.setOpenTime(dto.getOpenTime());
        branch.setCloseTime(dto.getCloseTime());
        return branch;
    }
}
