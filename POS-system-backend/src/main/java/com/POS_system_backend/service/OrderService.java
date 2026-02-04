package com.POS_system_backend.service;

import com.POS_system_backend.dto.OrderDto;
import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDto);

    OrderDto getOrderById(Long orderId);

    List<OrderDto> getOrdersByBranchId(Long branchId, Long customerId, Long cashierId, OrderStatus orderStatus, PaymentStatus paymentStatus);

    List<OrderDto> getOrdersByCashierId(Long cashierId);

    void deleteOrder(Long orderId);

    List<OrderDto> getTodayOrdersByBranchId(Long branchId);

    List<OrderDto> getOrdersByCustomerId(Long customerId);

    List<OrderDto> getTop5OrdersByBranchId(Long branchId);
}
