package com.POS_system_backend.controller;

import com.POS_system_backend.dto.OrderDto;
import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;
import com.POS_system_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        OrderDto order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getOrdersByBranchId(
        @PathVariable Long branchId,
        @RequestParam(required = false) Long customerId,
        @RequestParam(required = false) Long cashierId,
        @RequestParam(required = false) OrderStatus orderStatus,
        @RequestParam(required = false) PaymentStatus paymentStatus) {

        List<OrderDto> orders = orderService.getOrdersByBranchId(branchId, customerId, cashierId, orderStatus, paymentStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCashierId(@PathVariable Long cashierId) {
        List<OrderDto> orders = orderService.getOrdersByCashierId(cashierId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/branch/{branchId}/today")
    public ResponseEntity<List<OrderDto>> getTodayOrdersByBranchId(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTodayOrdersByBranchId(branchId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<OrderDto> orders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/branch/{branchId}/top5")
    public ResponseEntity<List<OrderDto>> getTop5OrdersByBranchId(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTop5OrdersByBranchId(branchId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
