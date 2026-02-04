package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.CustomerDto;
import com.POS_system_backend.entity.Customer;
import com.POS_system_backend.mapper.CustomerMapper;
import com.POS_system_backend.repository.CustomerRepository;
import com.POS_system_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {
        if (customerDto.getEmail() != null) {
            Optional<Customer> existingCustomer = customerRepository.findByEmail(customerDto.getEmail());
            if (existingCustomer.isPresent()) {
                throw new RuntimeException("Customer already exists with email: " + customerDto.getEmail());
            }
        }

        Customer customer = customerMapper.toEntity(customerDto);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toDto(savedCustomer);
    }

    @Override
    public CustomerDto updateCustomer(Long customerId, CustomerDto customerDto) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();

            if (customerDto.getFirstName() != null) customer.setFirstName(customerDto.getFirstName());
            if (customerDto.getEmail() != null) customer.setEmail(customerDto.getEmail());
            if (customerDto.getPhone() != null) customer.setPhone(customerDto.getPhone());

            Customer updatedCustomer = customerRepository.save(customer);
            return customerMapper.toDto(updatedCustomer);
        } else {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }
    }

    @Override
    public void deleteCustomer(Long customerId) {
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
        } else {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }
    }

    @Override
    public CustomerDto getCustomerById(Long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isPresent()) {
            return customerMapper.toDto(customerOptional.get());
        } else {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDto> customerDtos = new ArrayList<>();
        for (Customer customer : customers) {
            customerDtos.add(customerMapper.toDto(customer));
        }
        return customerDtos;
    }

    @Override
    public List<CustomerDto> searchCustomers(String keyword) {
        List<Customer> customers = customerRepository.searchCustomers(keyword);
        List<CustomerDto> customerDtos = new ArrayList<>();
        for (Customer customer : customers) {
            customerDtos.add(customerMapper.toDto(customer));
        }
        return customerDtos;
    }
}
