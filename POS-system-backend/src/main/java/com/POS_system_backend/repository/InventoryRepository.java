package com.POS_system_backend.repository;

import com.POS_system_backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByBranchId(Long branchId);

    Optional<Inventory> findByBranchIdAndProductId(Long branchId, Long productId);

    @Query("SELECT i FROM Inventory i WHERE i.branch.id = :branchId AND LOWER(i.product.name) LIKE LOWER(CONCAT('%', :productName, '%'))")
    List<Inventory> findByBranchIdAndProductName(@Param("branchId") Long branchId, @Param("productName") String productName);
}
