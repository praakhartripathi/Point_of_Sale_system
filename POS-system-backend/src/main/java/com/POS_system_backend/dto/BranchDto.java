package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BranchDto {
    @Schema(description = "Branch ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Branch Name", example = "Downtown Branch", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Branch Address", example = "123 Main St, City", requiredMode = Schema.RequiredMode.REQUIRED)
    private String address;

    @Schema(description = "Branch Phone Number", example = "9876543210", requiredMode = Schema.RequiredMode.REQUIRED)
    private String phone;

    @Schema(description = "Branch Email", example = "branch@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "Working Days", example = "[\"MONDAY\", \"TUESDAY\", \"WEDNESDAY\", \"THURSDAY\", \"FRIDAY\"]", 
            allowableValues = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"})
    private List<String> workingDays;

    @Schema(description = "Opening Time", example = "09:00:00", type = "string", pattern = "HH:mm:ss")
    private LocalTime openTime;

    @Schema(description = "Closing Time", example = "18:00:00", type = "string", pattern = "HH:mm:ss")
    private LocalTime closeTime;

    @Schema(description = "Store ID this branch belongs to", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long storeId;

    @Schema(description = "Manager User ID", example = "2")
    private Long managerId;
}
