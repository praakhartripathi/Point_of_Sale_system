package com.POS_system_backend.service;

import com.POS_system_backend.dto.EmployeeDto;
import com.POS_system_backend.dto.UserDto;

import java.util.List;

public interface EmployeeService {
    UserDto createStoreEmployee(EmployeeDto employeeDto);

    List<UserDto> getEmployeesByStoreId(Long storeId);

    UserDto createBranchEmployee(EmployeeDto employeeDto);

    UserDto updateEmployee(Long employeeId, EmployeeDto employeeDto);

    void deleteEmployee(Long employeeId);

    List<UserDto> getEmployeesByBranchId(Long branchId);
}
