package com.POS_system_backend.service.impl;

import com.POS_system_backend.configuration.JwtProvider;
import com.POS_system_backend.dto.LoginRequest;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.entity.Branch;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.entity.TrialAccount;
import com.POS_system_backend.entity.User;
import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.UserRole;
import com.POS_system_backend.repository.BranchRepository;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.repository.TrialAccountRepository;
import com.POS_system_backend.repository.UserRepository;
import com.POS_system_backend.service.TrialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class TrialServiceImpl implements TrialService {

    @Autowired
    private TrialAccountRepository trialAccountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public Map<String, Object> createTrialAccount(TrialSignupRequest request) {
        if (trialAccountRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered for trial.");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered as a user.");
        }

        // 1. Create Trial Account Record
        TrialAccount account = new TrialAccount();
        account.setBusinessName(request.getBusinessName());
        account.setOwnerName(request.getOwnerName());
        account.setEmail(request.getEmail());
        account.setMobile(request.getMobile());
        
        // Encrypt password
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        account.setPassword(encodedPassword);

        // Plan details (TRIAL, 7 days, 1 branch, 1 user) are set in @PrePersist in Entity
        TrialAccount savedAccount = trialAccountRepository.save(account);

        // 2. Create User (Admin)
        User user = new User();
        user.setFullName(request.getOwnerName());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setPhone(request.getMobile());
        user.setRole(UserRole.ROLE_ADMIN);
        User savedUser = userRepository.save(user);

        // 3. Create Store
        Store store = new Store();
        store.setBrand(request.getBusinessName());
        store.setStoreAdmin(savedUser);
        store.setStatus(StoreStatus.ACTIVE);
        store.setDescription("Trial Account Store");
        Store savedStore = storeRepository.save(store);

        // 4. Create Default Branch
        Branch branch = new Branch();
        branch.setName("Main Branch");
        branch.setStore(savedStore);
        branch.setAddress("Head Office");
        branch.setPhone(request.getMobile());
        branchRepository.save(branch);

        // Link Store to User
        savedUser.setStore(savedStore);
        userRepository.save(savedUser);

        // 4. Generate Real JWT
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(), 
                null, 
                Collections.singletonList(new SimpleGrantedAuthority(savedUser.getRole().toString()))
        );
        String token = jwtProvider.generateToken(authentication);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Trial account created successfully");
        response.put("token", token);
        response.put("role", savedUser.getRole().toString());
        response.put("name", savedUser.getFullName());
        response.put("trialEndDate", savedAccount.getEndDate());
        
        // Return specific account details to avoid circular reference issues in JSON serialization
        Map<String, Object> accountDetails = new HashMap<>();
        accountDetails.put("id", savedAccount.getId());
        accountDetails.put("businessName", savedAccount.getBusinessName());
        response.put("account", accountDetails);

        return response;
    }

    @Override
    public Map<String, Object> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        TrialAccount trialAccount = trialAccountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Not a trial account"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), 
                null, 
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString()))
        );
        String token = jwtProvider.generateToken(authentication);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("role", user.getRole().toString());
        response.put("name", user.getFullName());
        response.put("trialEndDate", trialAccount.getEndDate());
        
        Map<String, Object> accountDetails = new HashMap<>();
        accountDetails.put("id", trialAccount.getId());
        accountDetails.put("businessName", trialAccount.getBusinessName());
        response.put("account", accountDetails);

        return response;
    }
}