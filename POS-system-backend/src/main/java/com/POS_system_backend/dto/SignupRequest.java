package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.UserRole;
import lombok.Data;

@Data
public class SignupRequest {
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private UserRole role;
}
