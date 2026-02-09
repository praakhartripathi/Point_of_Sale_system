package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.ProductDto;
import com.POS_system_backend.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDto toDto(Product product) {
        if (product == null) {
            return null;
        }
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSku(product.getSku());
        dto.setDescription(product.getDescription());
        dto.setMrp(product.getMrp());
        dto.setSellingPrice(product.getSellingPrice());
        dto.setBrand(product.getBrand());
        dto.setImage(product.getImage());
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
        }
        if (product.getStore() != null) {
            dto.setStoreId(product.getStore().getId());
        }
        return dto;
    }

    public Product toEntity(ProductDto dto) {
        if (dto == null) {
            return null;
        }
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setMrp(dto.getMrp());
        product.setSellingPrice(dto.getSellingPrice());
        product.setBrand(dto.getBrand());
        product.setImage(dto.getImage());
        // Note: Category and Store need to be set separately as they require repository lookups
        return product;
    }
}
