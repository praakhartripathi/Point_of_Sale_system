package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    @Schema(description = "Category ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Category Name", example = "Electronics", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Category Description", example = "All electronic gadgets and devices")
    private String description;

    @Schema(description = "Store ID this category belongs to", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long storeId;
}
