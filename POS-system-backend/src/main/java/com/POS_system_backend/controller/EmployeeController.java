package com.POS_system_backend.controller;

import com.POS_system_backend.dto.EmployeeDto;
import com.POS_system_backend.dto.UserDto;
import com.POS_system_backend.service.EmployeeService;
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
@RequestMapping("/api/employees")
@Tag(name = "Employee Controller", description = "Endpoints for managing employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Operation(summary = "Create a store employee", description = "Creates a new employee associated with a store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Employee created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping("/store")
    public ResponseEntity<UserDto> createStoreEmployee(@RequestBody EmployeeDto employeeDto) {
        UserDto createdEmployee = employeeService.createStoreEmployee(employeeDto);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @Operation(summary = "Get employees by store ID", description = "Retrieves all employees for a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of employees", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class)))
    })
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<UserDto>> getEmployeesByStoreId(@PathVariable Long storeId) {
        List<UserDto> employees = employeeService.getEmployeesByStoreId(storeId);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @Operation(summary = "Create a branch employee", description = "Creates a new employee associated with a branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Employee created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping("/branch")
    public ResponseEntity<UserDto> createBranchEmployee(@RequestBody EmployeeDto employeeDto) {
        UserDto createdEmployee = employeeService.createBranchEmployee(employeeDto);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @Operation(summary = "Update an employee", description = "Updates an existing employee by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Employee updated successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))),
        @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    @PutMapping("/{employeeId}")
    public ResponseEntity<UserDto> updateEmployee(@PathVariable Long employeeId, @RequestBody EmployeeDto employeeDto) {
        UserDto updatedEmployee = employeeService.updateEmployee(employeeId, employeeDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @Operation(summary = "Delete an employee", description = "Deletes an employee by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Employee deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Employee not found", content = @Content)
    })
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get employees by branch ID", description = "Retrieves all employees for a specific branch.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of employees", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class)))
    })
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<UserDto>> getEmployeesByBranchId(@PathVariable Long branchId) {
        List<UserDto> employees = employeeService.getEmployeesByBranchId(branchId);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
}
