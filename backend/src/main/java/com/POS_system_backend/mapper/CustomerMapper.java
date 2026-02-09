package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.CustomerDto;
import com.POS_system_backend.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDto toDto(Customer customer) {
        if (customer == null) {
            return null;
        }
        CustomerDto dto = new CustomerDto();
        dto.setId(customer.getId());
        dto.setFirstName(customer.getFirstName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setCreatedDate(customer.getCreatedDate());
        dto.setModifiedDate(customer.getModifiedDate());
        dto.setUpdatedAt(customer.getUpdatedAt());
        return dto;
    }

    public Customer toEntity(CustomerDto dto) {
        if (dto == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setFirstName(dto.getFirstName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        return customer;
    }
}
