package com.POS_system_backend.controller;

import com.POS_system_backend.dto.OrderDto;
import com.POS_system_backend.entity.enums.OrderStatus;
import com.POS_system_backend.entity.enums.PaymentStatus;
import com.POS_system_backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order Controller", description = "Endpoints for managing orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Operation(summary = "Create a new order", description = "Creates a new order for a customer in a branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
        @ApiResponse(responseCode = "403", description = "Subscription required", content = @Content)
    })
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @Operation(summary = "Get order by ID", description = "Retrieves details of a specific order.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved order details",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class))),
        @ApiResponse(responseCode = "404", description = "Order not found", content = @Content)
    })
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        OrderDto order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @Operation(summary = "Get orders by branch ID", description = "Retrieves orders for a branch with optional filters.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of orders",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class)))
    })
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

    @Operation(summary = "Get orders by cashier ID", description = "Retrieves all orders processed by a specific cashier.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of orders",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class)))
    })
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCashierId(@PathVariable Long cashierId) {
        List<OrderDto> orders = orderService.getOrdersByCashierId(cashierId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Operation(summary = "Delete an order", description = "Deletes an order by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found", content = @Content)
    })
    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get today's orders by branch ID", description = "Retrieves all orders created today for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of orders",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class)))
    })
    @GetMapping("/branch/{branchId}/today")
    public ResponseEntity<List<OrderDto>> getTodayOrdersByBranchId(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTodayOrdersByBranchId(branchId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Operation(summary = "Get orders by customer ID", description = "Retrieves all orders placed by a specific customer.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of orders",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class)))
    })
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<OrderDto> orders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Operation(summary = "Get top 5 orders by branch ID", description = "Retrieves the top 5 recent orders for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of orders",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = OrderDto.class)))
    })
    @GetMapping("/branch/{branchId}/top5")
    public ResponseEntity<List<OrderDto>> getTop5OrdersByBranchId(@PathVariable Long branchId) {
        List<OrderDto> orders = orderService.getTop5OrdersByBranchId(branchId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
