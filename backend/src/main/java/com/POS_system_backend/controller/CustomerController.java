package com.POS_system_backend.controller;

import com.POS_system_backend.dto.CustomerDto;
import com.POS_system_backend.service.CustomerService;
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
@RequestMapping("/api/customers")
@Tag(name = "Customer Controller", description = "Endpoints for managing customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Operation(summary = "Create a new customer", description = "Creates a new customer record.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Customer created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto) {
        CustomerDto createdCustomer = customerService.createCustomer(customerDto);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @Operation(summary = "Update a customer", description = "Updates an existing customer by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDto.class))),
        @ApiResponse(responseCode = "404", description = "Customer not found", content = @Content)
    })
    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Long customerId, @RequestBody CustomerDto customerDto) {
        CustomerDto updatedCustomer = customerService.updateCustomer(customerId, customerDto);
        return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
    }

    @Operation(summary = "Delete a customer", description = "Deletes a customer by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Customer not found", content = @Content)
    })
    @DeleteMapping("/{customerId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long customerId) {
        customerService.deleteCustomer(customerId);
        return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get customer by ID", description = "Retrieves details of a specific customer.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved customer details",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDto.class))),
        @ApiResponse(responseCode = "404", description = "Customer not found", content = @Content)
    })
    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long customerId) {
        CustomerDto customer = customerService.getCustomerById(customerId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @Operation(summary = "Get all customers", description = "Retrieves a list of all customers.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of customers",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDto.class)))
    })
    @GetMapping
    public ResponseEntity<List<CustomerDto>> getAllCustomers() {
        List<CustomerDto> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @Operation(summary = "Search customers", description = "Searches for customers by a keyword (name, email, etc.).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved search results",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDto.class)))
    })
    @GetMapping("/search")
    public ResponseEntity<List<CustomerDto>> searchCustomers(@RequestParam String keyword) {
        List<CustomerDto> customers = customerService.searchCustomers(keyword);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
}
