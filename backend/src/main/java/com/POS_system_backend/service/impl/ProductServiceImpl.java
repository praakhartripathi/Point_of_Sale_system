package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.ProductDto;
import com.POS_system_backend.entity.Category;
import com.POS_system_backend.entity.Product;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.mapper.ProductMapper;
import com.POS_system_backend.repository.CategoryRepository;
import com.POS_system_backend.repository.ProductRepository;
import com.POS_system_backend.repository.StoreRepository;
import com.POS_system_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);

        if (productDto.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(productDto.getCategoryId());
            if (categoryOptional.isPresent()) {
                product.setCategory(categoryOptional.get());
            } else {
                throw new RuntimeException("Category not found with id: " + productDto.getCategoryId());
            }
        }

        if (productDto.getStoreId() != null) {
            Optional<Store> storeOptional = storeRepository.findById(productDto.getStoreId());
            if (storeOptional.isPresent()) {
                product.setStore(storeOptional.get());
            } else {
                throw new RuntimeException("Store not found with id: " + productDto.getStoreId());
            }
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto productDto) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            if (productDto.getName() != null) product.setName(productDto.getName());
            if (productDto.getSku() != null) product.setSku(productDto.getSku());
            if (productDto.getDescription() != null) product.setDescription(productDto.getDescription());
            if (productDto.getMrp() != 0) product.setMrp(productDto.getMrp());
            if (productDto.getSellingPrice() != 0) product.setSellingPrice(productDto.getSellingPrice());
            if (productDto.getBrand() != null) product.setBrand(productDto.getBrand());
            if (productDto.getImage() != null) product.setImage(productDto.getImage());

            if (productDto.getCategoryId() != null) {
                Optional<Category> categoryOptional = categoryRepository.findById(productDto.getCategoryId());
                if (categoryOptional.isPresent()) {
                    product.setCategory(categoryOptional.get());
                } else {
                    throw new RuntimeException("Category not found with id: " + productDto.getCategoryId());
                }
            }

            if (productDto.getStoreId() != null) {
                Optional<Store> storeOptional = storeRepository.findById(productDto.getStoreId());
                if (storeOptional.isPresent()) {
                    product.setStore(storeOptional.get());
                } else {
                    throw new RuntimeException("Store not found with id: " + productDto.getStoreId());
                }
            }

            Product updatedProduct = productRepository.save(product);
            return productMapper.toDto(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    @Override
    public void deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    @Override
    public List<ProductDto> getProductsByStoreId(Long storeId) {
        List<Product> products = productRepository.findByStoreId(storeId);
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(productMapper.toDto(product));
        }
        return productDtos;
    }

    @Override
    public List<ProductDto> searchProducts(Long storeId, String keyword) {
        List<Product> products = productRepository.searchProducts(storeId, keyword);
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(productMapper.toDto(product));
        }
        return productDtos;
    }
}
