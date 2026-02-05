package com.POS_system_backend.controller;

import com.POS_system_backend.dto.StoreRequest;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.service.StoreService;
import com.POS_system_backend.service.UserService;
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
@RequestMapping("/api/stores")
@Tag(name = "Store Controller", description = "Endpoints for managing stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Create a new store", description = "Creates a new store for the authenticated user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Store created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Store> createStoreHandler(@RequestBody StoreRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Store createdStore = storeService.createStore(req, user);
        return new ResponseEntity<>(createdStore, HttpStatus.CREATED);
    }

    @Operation(summary = "Update a store", description = "Updates an existing store by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Store updated successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class))),
        @ApiResponse(responseCode = "404", description = "Store not found", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStoreHandler(@PathVariable Long id, @RequestBody StoreRequest req) throws Exception {
        Store updatedStore = storeService.updateStore(id, req);
        return new ResponseEntity<>(updatedStore, HttpStatus.OK);
    }

    @Operation(summary = "Delete a store", description = "Deletes a store by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Store deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Store not found", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStoreHandler(@PathVariable Long id) throws Exception {
        storeService.deleteStore(id);
        return new ResponseEntity<>("Store deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get store by ID", description = "Retrieves details of a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved store details", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class))),
        @ApiResponse(responseCode = "404", description = "Store not found", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Store> getStoreByIdHandler(@PathVariable Long id) throws Exception {
        Store store = storeService.findStoreById(id);
        return new ResponseEntity<>(store, HttpStatus.OK);
    }

    @Operation(summary = "Get all stores", description = "Retrieves a list of all stores.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of stores", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class)))
    })
    @GetMapping
    public ResponseEntity<List<Store>> getAllStoresHandler() {
        List<Store> stores = storeService.getAllStores();
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @Operation(summary = "Get stores by admin ID", description = "Retrieves all stores managed by a specific admin.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of stores", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class)))
    })
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Store>> getStoresByAdminHandler(@PathVariable Long adminId) {
        List<Store> stores = storeService.getStoresByAdmin(adminId);
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @Operation(summary = "Get stores by employee ID", description = "Retrieves all stores where a specific user is an employee.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of stores", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class)))
    })
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Store>> getStoresByEmployeeHandler(@PathVariable Long employeeId) {
        List<Store> stores = storeService.getStoresByEmployee(employeeId);
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @Operation(summary = "Add employee to store", description = "Adds an existing user as an employee to a store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Employee added successfully"),
        @ApiResponse(responseCode = "404", description = "Store or User not found", content = @Content)
    })
    @PostMapping("/{storeId}/employees/{employeeId}")
    public ResponseEntity<String> addEmployeeToStoreHandler(@PathVariable Long storeId, @PathVariable Long employeeId) throws Exception {
        storeService.addEmployeeToStore(storeId, employeeId);
        return new ResponseEntity<>("Employee added to store successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get store employees", description = "Retrieves all employees of a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of employees", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
    })
    @GetMapping("/{storeId}/employees")
    public ResponseEntity<List<User>> getStoreEmployeesHandler(@PathVariable Long storeId) throws Exception {
        List<User> employees = storeService.getStoreEmployees(storeId);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @Operation(summary = "Create a branch", description = "Creates a new branch for a store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Branch created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping("/{storeId}/branches")
    public ResponseEntity<Store> createBranchHandler(@PathVariable Long storeId, @RequestBody StoreRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Store branch = storeService.createBranch(storeId, req, user);
        return new ResponseEntity<>(branch, HttpStatus.CREATED);
    }

    @Operation(summary = "Get store branches", description = "Retrieves all branches of a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of branches", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Store.class)))
    })
    @GetMapping("/{storeId}/branches")
    public ResponseEntity<List<Store>> getStoreBranchesHandler(@PathVariable Long storeId) throws Exception {
        List<Store> branches = storeService.getStoreBranches(storeId);
        return new ResponseEntity<>(branches, HttpStatus.OK);
    }
}
