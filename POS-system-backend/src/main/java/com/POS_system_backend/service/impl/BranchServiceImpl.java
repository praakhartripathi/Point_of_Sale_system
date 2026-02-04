package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.BranchDto;
import com.POS_system_backend.entity.Branch;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.mapper.BranchMapper;
import com.POS_system_backend.repository.BranchRepository;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.repository.UserRepository;
import com.POS_system_backend.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchMapper branchMapper;

    @Override
    public BranchDto createBranch(BranchDto branchDto) {
        Branch branch = branchMapper.toEntity(branchDto);

        if (branchDto.getStoreId() != null) {
            Optional<Store> storeOptional = storeRepository.findById(branchDto.getStoreId());
            if (storeOptional.isPresent()) {
                branch.setStore(storeOptional.get());
            } else {
                throw new RuntimeException("Store not found with id: " + branchDto.getStoreId());
            }
        }

        if (branchDto.getManagerId() != null) {
            Optional<User> userOptional = userRepository.findById(branchDto.getManagerId());
            if (userOptional.isPresent()) {
                branch.setManager(userOptional.get());
            } else {
                throw new RuntimeException("User (Manager) not found with id: " + branchDto.getManagerId());
            }
        }

        Branch savedBranch = branchRepository.save(branch);
        return branchMapper.toDto(savedBranch);
    }

    @Override
    public BranchDto updateBranch(Long branchId, BranchDto branchDto) {
        Optional<Branch> branchOptional = branchRepository.findById(branchId);
        if (branchOptional.isPresent()) {
            Branch branch = branchOptional.get();

            if (branchDto.getName() != null) branch.setName(branchDto.getName());
            if (branchDto.getAddress() != null) branch.setAddress(branchDto.getAddress());
            if (branchDto.getPhone() != null) branch.setPhone(branchDto.getPhone());
            if (branchDto.getEmail() != null) branch.setEmail(branchDto.getEmail());
            if (branchDto.getWorkingDays() != null) branch.setWorkingDays(branchDto.getWorkingDays());
            if (branchDto.getOpenTime() != null) branch.setOpenTime(branchDto.getOpenTime());
            if (branchDto.getCloseTime() != null) branch.setCloseTime(branchDto.getCloseTime());

            if (branchDto.getStoreId() != null) {
                Optional<Store> storeOptional = storeRepository.findById(branchDto.getStoreId());
                if (storeOptional.isPresent()) {
                    branch.setStore(storeOptional.get());
                } else {
                    throw new RuntimeException("Store not found with id: " + branchDto.getStoreId());
                }
            }

            if (branchDto.getManagerId() != null) {
                Optional<User> userOptional = userRepository.findById(branchDto.getManagerId());
                if (userOptional.isPresent()) {
                    branch.setManager(userOptional.get());
                } else {
                    throw new RuntimeException("User (Manager) not found with id: " + branchDto.getManagerId());
                }
            }

            Branch updatedBranch = branchRepository.save(branch);
            return branchMapper.toDto(updatedBranch);
        } else {
            throw new RuntimeException("Branch not found with id: " + branchId);
        }
    }

    @Override
    public void deleteBranch(Long branchId) {
        if (branchRepository.existsById(branchId)) {
            branchRepository.deleteById(branchId);
        } else {
            throw new RuntimeException("Branch not found with id: " + branchId);
        }
    }

    @Override
    public List<BranchDto> getBranchesByStoreId(Long storeId) {
        List<Branch> branches = branchRepository.findByStoreId(storeId);
        List<BranchDto> branchDtos = new ArrayList<>();
        for (Branch branch : branches) {
            branchDtos.add(branchMapper.toDto(branch));
        }
        return branchDtos;
    }

    @Override
    public BranchDto getBranchById(Long branchId) {
        Optional<Branch> branchOptional = branchRepository.findById(branchId);
        if (branchOptional.isPresent()) {
            return branchMapper.toDto(branchOptional.get());
        } else {
            throw new RuntimeException("Branch not found with id: " + branchId);
        }
    }
}
