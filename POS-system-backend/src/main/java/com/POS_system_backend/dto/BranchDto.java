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
    @Schema(description = "Branch ID", example = "1")
    private Long id;

    @Schema(description = "Branch Name", example = "Downtown Branch")
    private String name;

    @Schema(description = "Branch Address", example = "123 Main St, City")
    private String address;

    @Schema(description = "Branch Phone Number", example = "9876543210")
    private String phone;

    @Schema(description = "Branch Email", example = "branch@example.com")
    private String email;

    @Schema(description = "Working Days", example = "[\"MONDAY\", \"TUESDAY\", \"WEDNESDAY\", \"THURSDAY\", \"FRIDAY\"]")
    private List<String> workingDays;

    @Schema(description = "Opening Time", example = "09:00:00")
    private LocalTime openTime;

    @Schema(description = "Closing Time", example = "18:00:00")
    private LocalTime closeTime;

    @Schema(description = "Store ID this branch belongs to", example = "1")
    private Long storeId;

    @Schema(description = "Manager User ID", example = "2")
    private Long managerId;
}
