package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    @Schema(description = "Product ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Product Name", example = "iPhone 15", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Stock Keeping Unit", example = "IP15-128")
    private String sku;

    @Schema(description = "Product Description", example = "Latest Apple iPhone with 128GB storage")
    private String description;

    @Schema(description = "Maximum Retail Price", example = "999.99")
    private double mrp;

    @Schema(description = "Selling Price", example = "899.99", requiredMode = Schema.RequiredMode.REQUIRED)
    private double sellingPrice;

    @Schema(description = "Brand Name", example = "Apple")
    private String brand;

    @Schema(description = "Product Image URL", example = "http://example.com/image.png")
    private String image;

    @Schema(description = "Category ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long categoryId;

    @Schema(description = "Store ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long storeId;
}
