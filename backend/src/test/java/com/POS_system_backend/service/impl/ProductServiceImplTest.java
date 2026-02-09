package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.ProductDto;
import com.POS_system_backend.entity.Category;
import com.POS_system_backend.entity.Product;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.mapper.ProductMapper;
import com.POS_system_backend.repository.CategoryRepository;
import com.POS_system_backend.repository.ProductRepository;
import com.POS_system_backend.repository.StoreRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private ProductMapper productMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProduct_Success() {
        ProductDto productDto = new ProductDto();
        productDto.setName("Test Product");
        productDto.setCategoryId(1L);
        productDto.setStoreId(1L);

        Product product = new Product();
        product.setName("Test Product");

        Category category = new Category();
        category.setId(1L);

        Store store = new Store();
        store.setId(1L);

        when(productMapper.toEntity(productDto)).thenReturn(product);
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(productMapper.toDto(any(Product.class))).thenReturn(productDto);

        ProductDto createdProduct = productService.createProduct(productDto);

        assertNotNull(createdProduct);
        assertEquals("Test Product", createdProduct.getName());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void updateProduct_Success() {
        Long productId = 1L;
        ProductDto productDto = new ProductDto();
        productDto.setName("Updated Product");

        Product existingProduct = new Product();
        existingProduct.setId(productId);
        existingProduct.setName("Old Product");

        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(existingProduct);
        when(productMapper.toDto(any(Product.class))).thenReturn(productDto);

        ProductDto updatedProduct = productService.updateProduct(productId, productDto);

        assertNotNull(updatedProduct);
        assertEquals("Updated Product", updatedProduct.getName());
        verify(productRepository, times(1)).save(existingProduct);
    }

    @Test
    void deleteProduct_Success() {
        Long productId = 1L;
        when(productRepository.existsById(productId)).thenReturn(true);

        productService.deleteProduct(productId);

        verify(productRepository, times(1)).deleteById(productId);
    }

    @Test
    void getProductsByStoreId_Success() {
        Long storeId = 1L;
        List<Product> products = new ArrayList<>();
        products.add(new Product());

        when(productRepository.findByStoreId(storeId)).thenReturn(products);
        when(productMapper.toDto(any(Product.class))).thenReturn(new ProductDto());

        List<ProductDto> result = productService.getProductsByStoreId(storeId);

        assertNotNull(result);
        assertEquals(1, result.size());
    }
}
