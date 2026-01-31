package com.POS_system_backend.service;

import com.POS_system_backend.dto.AuthResponse;
import com.POS_system_backend.dto.TrialChangePassword;
import com.POS_system_backend.dto.TrialSignInRequest;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.dto.TrialProfileResponse;

public interface TrialService {
    AuthResponse signupTrial(TrialSignupRequest request);
    AuthResponse signinTrial(TrialSignInRequest request);
    String changePassword(String email, TrialChangePassword request);
    TrialProfileResponse getTrialProfile(String email);
}
