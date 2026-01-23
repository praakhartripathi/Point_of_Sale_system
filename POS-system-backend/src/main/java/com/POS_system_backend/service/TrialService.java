package com.POS_system_backend.service;

import com.POS_system_backend.dto.AuthResponse;
import com.POS_system_backend.dto.TrialChangePassword;
import com.POS_system_backend.dto.TrialSigninRequest;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.dto.TrialProfileResponse;

public interface TrialService {
    AuthResponse signupTrial(TrialSignupRequest request);
    AuthResponse signinTrial(TrialSigninRequest request);
    String changePassword(String email, TrialChangePassword request);
    TrialProfileResponse getTrialProfile(String email);
}
