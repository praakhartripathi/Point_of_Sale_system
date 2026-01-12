package com.POS_system_backend.controller;

import com.POS_system_backend.dto.StoreRequest;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.service.StoreService;
import com.POS_system_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Store> createStoreHandler(@RequestBody StoreRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Store createdStore = storeService.createStore(req, user);
        return new ResponseEntity<>(createdStore, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStoreHandler(@PathVariable Long id, @RequestBody StoreRequest req) throws Exception {
        Store updatedStore = storeService.updateStore(id, req);
        return new ResponseEntity<>(updatedStore, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStoreHandler(@PathVariable Long id) throws Exception {
        storeService.deleteStore(id);
        return new ResponseEntity<>("Store deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Store> getStoreByIdHandler(@PathVariable Long id) throws Exception {
        Store store = storeService.findStoreById(id);
        return new ResponseEntity<>(store, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Store>> getAllStoresHandler() {
        List<Store> stores = storeService.getAllStores();
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Store>> getStoresByAdminHandler(@PathVariable Long adminId) {
        List<Store> stores = storeService.getStoresByAdmin(adminId);
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Store>> getStoresByEmployeeHandler(@PathVariable Long employeeId) {
        List<Store> stores = storeService.getStoresByEmployee(employeeId);
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @PostMapping("/{storeId}/employees/{employeeId}")
    public ResponseEntity<String> addEmployeeToStoreHandler(@PathVariable Long storeId, @PathVariable Long employeeId) throws Exception {
        storeService.addEmployeeToStore(storeId, employeeId);
        return new ResponseEntity<>("Employee added to store successfully", HttpStatus.OK);
    }

    @GetMapping("/{storeId}/employees")
    public ResponseEntity<List<User>> getStoreEmployeesHandler(@PathVariable Long storeId) throws Exception {
        List<User> employees = storeService.getStoreEmployees(storeId);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PostMapping("/{storeId}/branches")
    public ResponseEntity<Store> createBranchHandler(@PathVariable Long storeId, @RequestBody StoreRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Store branch = storeService.createBranch(storeId, req, user);
        return new ResponseEntity<>(branch, HttpStatus.CREATED);
    }

    @GetMapping("/{storeId}/branches")
    public ResponseEntity<List<Store>> getStoreBranchesHandler(@PathVariable Long storeId) throws Exception {
        List<Store> branches = storeService.getStoreBranches(storeId);
        return new ResponseEntity<>(branches, HttpStatus.OK);
    }
}
