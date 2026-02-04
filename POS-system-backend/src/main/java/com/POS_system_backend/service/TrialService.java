package com.POS_system_backend.service;

import com.POS_system_backend.dto.AuthResponse;
import com.POS_system_backend.dto.TrialUpdatePasswordRequest;
import com.POS_system_backend.dto.TrialUpdateProfileRequest;
import com.POS_system_backend.dto.TrialSignInRequest;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.dto.TrialProfileResponse;

public interface TrialService {
    AuthResponse signupTrial(TrialSignupRequest request);

    AuthResponse signinTrial(TrialSignInRequest request);

    String changePassword(String email, TrialUpdatePasswordRequest request);

    TrialProfileResponse getTrialProfile(String email);

    TrialProfileResponse updateProfile(String email, TrialUpdateProfileRequest request);
}
