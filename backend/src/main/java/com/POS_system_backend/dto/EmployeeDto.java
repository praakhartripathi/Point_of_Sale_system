package com.POS_system_backend.dto;

import com.POS_system_backend.entity.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    @Schema(description = "Employee ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Employee Full Name", example = "Bob Employee", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fullName;

    @Schema(description = "Employee Email", example = "bob@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "Employee Password", example = "password123", accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Schema(description = "Employee Phone", example = "9876543210")
    private String phone;

    @Schema(description = "Employee Role", example = "ROLE_CASHIER", requiredMode = Schema.RequiredMode.REQUIRED,
        allowableValues = {"ROLE_CASHIER", "ROLE_BRANCH_MANAGER", "ROLE_STORE_MANAGER"})
    private UserRole role;

    @Schema(description = "Store ID", example = "1")
    private Long storeId;

    @Schema(description = "Branch ID", example = "1")
    private Long branchId;
}
