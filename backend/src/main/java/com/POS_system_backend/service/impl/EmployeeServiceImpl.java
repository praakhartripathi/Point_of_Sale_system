package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.EmployeeDto;
import com.POS_system_backend.dto.UserDto;
import com.POS_system_backend.entity.Branch;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.mapper.UserMapper;
import com.POS_system_backend.repository.BranchRepository;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.repository.UserRepository;
import com.POS_system_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDto createStoreEmployee(EmployeeDto employeeDto) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(employeeDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with email: " + employeeDto.getEmail());
        }

        User user = new User();
        user.setFullName(employeeDto.getFullName());
        user.setEmail(employeeDto.getEmail());
        user.setPassword(passwordEncoder.encode(employeeDto.getPassword()));
        user.setPhone(employeeDto.getPhone());
        user.setRole(employeeDto.getRole());

        User savedUser = userRepository.save(user);

        // Add user to store employees list
        if (employeeDto.getStoreId() != null) {
            Optional<Store> storeOptional = storeRepository.findById(employeeDto.getStoreId());
            if (storeOptional.isPresent()) {
                Store store = storeOptional.get();
                store.getEmployees().add(savedUser);
                storeRepository.save(store);
            } else {
                throw new RuntimeException("Store not found with id: " + employeeDto.getStoreId());
            }
        }

        return userMapper.toDto(savedUser);
    }

    @Override
    public List<UserDto> getEmployeesByStoreId(Long storeId) {
        Optional<Store> storeOptional = storeRepository.findById(storeId);
        if (storeOptional.isPresent()) {
            List<User> employees = storeOptional.get().getEmployees();
            List<UserDto> userDtos = new ArrayList<>();
            for (User employee : employees) {
                userDtos.add(userMapper.toDto(employee));
            }
            return userDtos;
        } else {
            throw new RuntimeException("Store not found with id: " + storeId);
        }
    }

    @Override
    public UserDto createBranchEmployee(EmployeeDto employeeDto) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(employeeDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with email: " + employeeDto.getEmail());
        }

        User user = new User();
        user.setFullName(employeeDto.getFullName());
        user.setEmail(employeeDto.getEmail());
        user.setPassword(passwordEncoder.encode(employeeDto.getPassword()));
        user.setPhone(employeeDto.getPhone());
        user.setRole(employeeDto.getRole());

        // Add user to branch employees list
        if (employeeDto.getBranchId() != null) {
            Optional<Branch> branchOptional = branchRepository.findById(employeeDto.getBranchId());
            if (branchOptional.isPresent()) {
                user.setBranch(branchOptional.get());
            } else {
                throw new RuntimeException("Branch not found with id: " + employeeDto.getBranchId());
            }
        }

        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    @Override
    public UserDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        Optional<User> userOptional = userRepository.findById(employeeId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (employeeDto.getFullName() != null) user.setFullName(employeeDto.getFullName());
            if (employeeDto.getEmail() != null) user.setEmail(employeeDto.getEmail());
            if (employeeDto.getPhone() != null) user.setPhone(employeeDto.getPhone());
            if (employeeDto.getRole() != null) user.setRole(employeeDto.getRole());
            if (employeeDto.getPassword() != null && !employeeDto.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(employeeDto.getPassword()));
            }

            User updatedUser = userRepository.save(user);
            return userMapper.toDto(updatedUser);
        } else {
            throw new RuntimeException("Employee not found with id: " + employeeId);
        }
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        if (userRepository.existsById(employeeId)) {
            userRepository.deleteById(employeeId);
        } else {
            throw new RuntimeException("Employee not found with id: " + employeeId);
        }
    }

    @Override
    public List<UserDto> getEmployeesByBranchId(Long branchId) {
        List<User> employees = userRepository.findByBranchId(branchId);
        List<UserDto> userDtos = new ArrayList<>();
        for (User employee : employees) {
            userDtos.add(userMapper.toDto(employee));
        }
        return userDtos;
    }
}
