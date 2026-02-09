package com.POS_system_backend.controller;

import com.POS_system_backend.dto.ProductDto;
import com.POS_system_backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product Controller", description = "Endpoints for managing products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Operation(summary = "Create a new product", description = "Creates a new product for a store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Product created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto createdProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @Operation(summary = "Update a product", description = "Updates an existing product by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProduct(productId, productDto);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @Operation(summary = "Delete a product", description = "Deletes a product by ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    @Operation(summary = "Get products by store ID", description = "Retrieves all products for a specific store.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list of products",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class)))
    })
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getProductsByStoreId(@PathVariable Long storeId) {
        List<ProductDto> products = productService.getProductsByStoreId(storeId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @Operation(summary = "Search products", description = "Searches for products in a store by keyword.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved search results",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class)))
    })
    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@PathVariable Long storeId, @RequestParam String keyword) {
        List<ProductDto> products = productService.searchProducts(storeId, keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
