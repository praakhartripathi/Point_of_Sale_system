package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    @Schema(description = "JWT Access Token", example = "eyJhbGciOiJIUzI1NiJ9...", requiredMode = Schema.RequiredMode.REQUIRED)
    private String token;

    @Schema(description = "Response message", example = "Login successful", requiredMode = Schema.RequiredMode.REQUIRED)
    private String message;

    @Schema(description = "User Role", example = "ROLE_TRIAL", requiredMode = Schema.RequiredMode.REQUIRED,
        allowableValues = {"ROLE_SUPERADMIN", "ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER", "ROLE_CASHIER", "ROLE_TRIAL"})
    private String role;

    @Schema(description = "User ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    @Schema(description = "User Email", example = "user@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;
}
