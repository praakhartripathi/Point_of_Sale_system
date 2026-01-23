package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.*;
import com.POS_system_backend.entity.TrialAccount;
import com.POS_system_backend.repository.TrialAccountRepository;
import com.POS_system_backend.service.TrialService;
import com.POS_system_backend.configuration.JwtProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class TrialServiceImpl implements TrialService {

    private final TrialAccountRepository trialAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public TrialServiceImpl(TrialAccountRepository trialAccountRepository,
                                   PasswordEncoder passwordEncoder,
                                   JwtProvider jwtProvider) {
        this.trialAccountRepository = trialAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public AuthResponse signupTrial(TrialSignupRequest request) {

        if (trialAccountRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        TrialAccount trial = new TrialAccount();
        trial.setBusinessName(request.getBusinessName());
        trial.setOwnerName(request.getOwnerName());
        trial.setEmail(request.getEmail());
        trial.setMobile(request.getMobile());
        trial.setPassword(passwordEncoder.encode(request.getPassword()));

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
    public AuthResponse signinTrial(TrialSigninRequest request) {

        TrialAccount trial = trialAccountRepository
                .findByEmailAndActiveTrue(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials or trial expired"));

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
    public String changePassword(String email, TrialChangePassword request) {

        TrialAccount trial = trialAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Trial account not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), trial.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        trial.setPassword(passwordEncoder.encode(request.getNewPassword()));
        trialAccountRepository.save(trial);

        return "Password changed successfully";
    }

    @Override
    public TrialProfileResponse getTrialProfile(String email) {

        TrialAccount trial = trialAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Trial account not found"));

        TrialProfileResponse dto = new TrialProfileResponse();
        dto.setId(trial.getId());
        dto.setBusinessName(trial.getBusinessName());
        dto.setOwnerName(trial.getOwnerName());
        dto.setEmail(trial.getEmail());
        dto.setMobile(trial.getMobile());
        dto.setPlan(trial.getPlan());
        dto.setActive(trial.isActive());
        dto.setStartDate(trial.getStartDate());
        dto.setEndDate(trial.getEndDate());
        dto.setMaxBranches(trial.getMaxBranches());
        dto.setMaxUsers(trial.getMaxUsers());

        return dto;
    }
}
