package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.*;
import com.POS_system_backend.entity.TrialAccount;
import com.POS_system_backend.mapper.TrialMapper;
import com.POS_system_backend.repository.TrialAccountRepository;
import com.POS_system_backend.service.TrialService;
import com.POS_system_backend.configuration.JwtProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class TrialServiceImpl implements TrialService {

    private final TrialAccountRepository trialAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final TrialMapper trialMapper;

    public TrialServiceImpl(TrialAccountRepository trialAccountRepository,
                                   PasswordEncoder passwordEncoder,
                                   JwtProvider jwtProvider,
                                   TrialMapper trialMapper) {
        this.trialAccountRepository = trialAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.trialMapper = trialMapper;
    }

    @Override
    public AuthResponse signupTrial(TrialSignupRequest request) {

        if (trialAccountRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        TrialAccount trial = trialMapper.toEntity(request);
        trial.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Explicitly set default values
        trial.setActive(true);
        trial.setPlan("TRIAL");
        trial.setMaxBranches(1);
        trial.setMaxUsers(1);
        
        LocalDateTime now = LocalDateTime.now();
        trial.setStartDate(now);
        trial.setEndDate(now.plusDays(7));

        TrialAccount savedTrial = trialAccountRepository.save(trial);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedTrial.getEmail(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_TRIAL"))
        );
        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(
                token,
                "Trial account created successfully",
                "ROLE_TRIAL",
                savedTrial.getId(),
                savedTrial.getEmail()
        );
    }

    @Override
    public AuthResponse signinTrial(TrialSignInRequest request) {

        Optional<TrialAccount> trialOpt = trialAccountRepository.findByEmailAndActiveTrue(request.getEmail());
        if (trialOpt.isEmpty()) {
            throw new RuntimeException("Invalid credentials or trial expired");
        }
        TrialAccount trial = trialOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), trial.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                trial.getEmail(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_TRIAL"))
        );
        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(
                token,
                "Login successful",
                "ROLE_TRIAL",
                trial.getId(),
                trial.getEmail()
        );
    }

    @Override
    public String changePassword(String email, TrialUpdatePasswordRequest request) {

        Optional<TrialAccount> trialOpt = trialAccountRepository.findByEmail(email);
        if (trialOpt.isEmpty()) {
            throw new RuntimeException("Trial account not found");
        }
        TrialAccount trial = trialOpt.get();

        // 1. Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), trial.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // 2. Confirm new password
        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        // 3. Prevent reuse of old password
        if (passwordEncoder.matches(request.getNewPassword(), trial.getPassword())) {
            throw new RuntimeException("New password cannot be same as current password");
        }

        // 4. Save new password
        trial.setPassword(passwordEncoder.encode(request.getNewPassword()));
        trialAccountRepository.save(trial);

        System.out.println("Password changed successfully for email: " + email);

        return "Password changed successfully";
    }

    @Override
    public TrialProfileResponse getTrialProfile(String email) {

        Optional<TrialAccount> trialOpt = trialAccountRepository.findByEmail(email);
        if (trialOpt.isEmpty()) {
            throw new RuntimeException("Trial account not found");
        }
        TrialAccount trial = trialOpt.get();

        return trialMapper.toProfileResponse(trial);
    }
}
