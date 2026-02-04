package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.OrderDto;
import com.POS_system_backend.entity.*;
import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;
import com.POS_system_backend.mapper.OrderMapper;
import com.POS_system_backend.repository.*;
import com.POS_system_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = orderMapper.toEntity(orderDto);

        if (orderDto.getCustomerId() != null) {
            Optional<Customer> customerOptional = customerRepository.findById(orderDto.getCustomerId());
            if (customerOptional.isPresent()) {
                order.setCustomer(customerOptional.get());
            } else {
                throw new RuntimeException("Customer not found with id: " + orderDto.getCustomerId());
            }
        }

        if (orderDto.getStoreId() != null) {
            Optional<Store> storeOptional = storeRepository.findById(orderDto.getStoreId());
            if (storeOptional.isPresent()) {
                order.setStore(storeOptional.get());
            } else {
                throw new RuntimeException("Store not found with id: " + orderDto.getStoreId());
            }
        }

        if (orderDto.getBranchId() != null) {
            Optional<Branch> branchOptional = branchRepository.findById(orderDto.getBranchId());
            if (branchOptional.isPresent()) {
                order.setBranch(branchOptional.get());
            } else {
                throw new RuntimeException("Branch not found with id: " + orderDto.getBranchId());
            }
        }

        if (orderDto.getCashierId() != null) {
            Optional<User> userOptional = userRepository.findById(orderDto.getCashierId());
            if (userOptional.isPresent()) {
                order.setCashier(userOptional.get());
            } else {
                throw new RuntimeException("Cashier (User) not found with id: " + orderDto.getCashierId());
            }
        }

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            return orderMapper.toDto(orderOptional.get());
        } else {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
    }

    @Override
    public List<OrderDto> getOrdersByBranchId(Long branchId, Long customerId, Long cashierId, OrderStatus orderStatus, PaymentStatus paymentStatus) {
        List<Order> orders = orderRepository.findOrdersByBranchIdAndFilters(branchId, customerId, cashierId, orderStatus, paymentStatus);
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orders) {
            orderDtos.add(orderMapper.toDto(order));
        }
        return orderDtos;
    }

    @Override
    public List<OrderDto> getOrdersByCashierId(Long cashierId) {
        List<Order> orders = orderRepository.findByCashierId(cashierId);
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orders) {
            orderDtos.add(orderMapper.toDto(order));
        }
        return orderDtos;
    }

    @Override
    public void deleteOrder(Long orderId) {
        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
        } else {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
    }

    @Override
    public List<OrderDto> getTodayOrdersByBranchId(Long branchId) {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        List<Order> orders = orderRepository.findOrdersByBranchIdAndDateRange(branchId, startOfDay, endOfDay);
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orders) {
            orderDtos.add(orderMapper.toDto(order));
        }
        return orderDtos;
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orders) {
            orderDtos.add(orderMapper.toDto(order));
        }
        return orderDtos;
    }

    @Override
    public List<OrderDto> getTop5OrdersByBranchId(Long branchId) {
        Pageable topFive = PageRequest.of(0, 5);
        List<Order> orders = orderRepository.findTopOrdersByBranchId(branchId, topFive);
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orders) {
            orderDtos.add(orderMapper.toDto(order));
        }
        return orderDtos;
    }
}
