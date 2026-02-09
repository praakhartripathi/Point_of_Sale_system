package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {
    @Schema(description = "Full Name", example = "John Doe", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Schema(description = "Email Address", example = "john.doe@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Schema(description = "Password", example = "password123", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Password is required")
    private String password;

    @Schema(description = "Phone Number", example = "9876543210")
    private String phone;

    @Schema(description = "User Role", example = "ROLE_STORE_MANAGER", requiredMode = Schema.RequiredMode.REQUIRED,
        allowableValues = {"ROLE_SUPERADMIN", "ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER", "ROLE_CASHIER"})
    private UserRole role;
}
