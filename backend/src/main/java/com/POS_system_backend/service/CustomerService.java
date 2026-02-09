package com.POS_system_backend.service;

import com.POS_system_backend.dto.CustomerDto;

import java.util.List;

public interface CustomerService {
    CustomerDto createCustomer(CustomerDto customerDto);

    CustomerDto updateCustomer(Long customerId, CustomerDto customerDto);

    void deleteCustomer(Long customerId);

    CustomerDto getCustomerById(Long customerId);

    List<CustomerDto> getAllCustomers();

    List<CustomerDto> searchCustomers(String keyword);
}
