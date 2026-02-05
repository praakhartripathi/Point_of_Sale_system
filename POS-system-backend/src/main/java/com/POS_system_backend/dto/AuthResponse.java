package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    @Schema(description = "JWT Access Token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String token;

    @Schema(description = "Response message", example = "Login successful")
    private String message;

    @Schema(description = "User Role", example = "ROLE_TRIAL")
    private String role;

    @Schema(description = "User ID", example = "1")
    private Long id;

    @Schema(description = "User Email", example = "user@example.com")
    private String email;
}
