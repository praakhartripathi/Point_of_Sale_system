package com.POS_system_backend.service;

import com.POS_system_backend.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductDto updateProduct(Long productId, ProductDto productDto);

    void deleteProduct(Long productId);

    List<ProductDto> getProductsByStoreId(Long storeId);

    List<ProductDto> searchProducts(Long storeId, String keyword);
}
