package com.POS_system_backend.service;

import com.POS_system_backend.dto.LoginRequest;
import java.util.Map;

public interface AuthService {
    Map<String, Object> login(LoginRequest request);
}