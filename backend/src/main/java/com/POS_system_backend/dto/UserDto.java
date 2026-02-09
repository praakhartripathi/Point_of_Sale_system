package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    @Schema(description = "User ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Full Name", example = "John Doe")
    private String fullName;

    @Schema(description = "Email Address", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Phone Number", example = "9876543210")
    private String phone;

    @Schema(description = "User Role", example = "ROLE_STORE_MANAGER", allowableValues = {"ROLE_SUPERADMIN", "ROLE_STORE_MANAGER", "ROLE_BRANCH_MANAGER", "ROLE_CASHIER", "ROLE_TRIAL"})
    private UserRole role;

    @Schema(description = "Account Creation Date", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Schema(description = "Last Update Date", example = "2023-10-28 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @Schema(description = "Last Login Timestamp", example = "2023-10-29 09:30:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLoginAt;
}
