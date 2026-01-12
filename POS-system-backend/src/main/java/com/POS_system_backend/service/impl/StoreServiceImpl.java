package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.StoreRequest;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.service.StoreService;
import com.POS_system_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private UserService userService;

    @Override
    public Store createStore(StoreRequest req, User user) {
        Store store = new Store();
        store.setBrand(req.getBrand());
        store.setDescription(req.getDescription());
        store.setStoreType(req.getStoreType());
        store.setStatus(req.getStatus());
        store.setContact(req.getContact());
        store.setStoreAdmin(user);
        
        return storeRepository.save(store);
    }

    @Override
    public Store updateStore(Long storeId, StoreRequest req) throws Exception {
        Store store = findStoreById(storeId);
        
        if (req.getBrand() != null) store.setBrand(req.getBrand());
        if (req.getDescription() != null) store.setDescription(req.getDescription());
        if (req.getStoreType() != null) store.setStoreType(req.getStoreType());
        if (req.getStatus() != null) store.setStatus(req.getStatus());
        if (req.getContact() != null) store.setContact(req.getContact());

        return storeRepository.save(store);
    }

    @Override
    public void deleteStore(Long storeId) throws Exception {
        Store store = findStoreById(storeId);
        storeRepository.delete(store);
    }

    @Override
    public Store findStoreById(Long storeId) throws Exception {
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isEmpty()) {
            throw new Exception("Store not found with id: " + storeId);
        }
        return store.get();
    }

    @Override
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @Override
    public List<Store> getStoresByAdmin(Long adminId) {
        return storeRepository.findByStoreAdminId(adminId);
    }

    @Override
    public List<Store> getStoresByEmployee(Long employeeId) {
        return storeRepository.findByEmployeeId(employeeId);
    }

    @Override
    public void addEmployeeToStore(Long storeId, Long employeeId) throws Exception {
        Store store = findStoreById(storeId);
        User employee = userService.findUserById(employeeId);
        
        if (!store.getEmployees().contains(employee)) {
            store.getEmployees().add(employee);
            storeRepository.save(store);
        }
    }

    @Override
    public List<User> getStoreEmployees(Long storeId) throws Exception {
        Store store = findStoreById(storeId);
        return store.getEmployees();
    }

    @Override
    public List<Store> getStoreBranches(Long storeId) throws Exception {
        Store store = findStoreById(storeId);
        return store.getBranches();
    }

    @Override
    public Store createBranch(Long parentStoreId, StoreRequest req, User user) throws Exception {
        Store parentStore = findStoreById(parentStoreId);
        
        Store branch = new Store();
        branch.setBrand(req.getBrand());
        branch.setDescription(req.getDescription());
        branch.setStoreType(req.getStoreType());
        branch.setStatus(req.getStatus());
        branch.setContact(req.getContact());
        branch.setStoreAdmin(user);
        branch.setParentStore(parentStore);
        
        return storeRepository.save(branch);
    }
}
