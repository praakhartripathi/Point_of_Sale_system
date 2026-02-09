package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.CategoryDto;
import com.POS_system_backend.entity.Category;
import com.POS_system_backend.entity.Store;
import com.POS_system_backend.mapper.CategoryMapper;
import com.POS_system_backend.repository.CategoryRepository;
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

class CategoryServiceImplTest {

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCategory_Success() {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName("Test Category");
        categoryDto.setStoreId(1L);

        Category category = new Category();
        category.setName("Test Category");

        Store store = new Store();
        store.setId(1L);

        when(categoryMapper.toEntity(categoryDto)).thenReturn(category);
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        when(categoryMapper.toDto(any(Category.class))).thenReturn(categoryDto);

        CategoryDto createdCategory = categoryService.createCategory(categoryDto);

        assertNotNull(createdCategory);
        assertEquals("Test Category", createdCategory.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void updateCategory_Success() {
        Long categoryId = 1L;
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName("Updated Category");

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Old Category");

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);
        when(categoryMapper.toDto(any(Category.class))).thenReturn(categoryDto);

        CategoryDto updatedCategory = categoryService.updateCategory(categoryId, categoryDto);

        assertNotNull(updatedCategory);
        assertEquals("Updated Category", updatedCategory.getName());
        verify(categoryRepository, times(1)).save(existingCategory);
    }

    @Test
    void deleteCategory_Success() {
        Long categoryId = 1L;
        when(categoryRepository.existsById(categoryId)).thenReturn(true);

        categoryService.deleteCategory(categoryId);

        verify(categoryRepository, times(1)).deleteById(categoryId);
    }

    @Test
    void getCategoriesByStoreId_Success() {
        Long storeId = 1L;
        List<Category> categories = new ArrayList<>();
        categories.add(new Category());

        when(categoryRepository.findByStoreId(storeId)).thenReturn(categories);
        when(categoryMapper.toDto(any(Category.class))).thenReturn(new CategoryDto());

        List<CategoryDto> result = categoryService.getCategoriesByStoreId(storeId);

        assertNotNull(result);
        assertEquals(1, result.size());
    }
}
