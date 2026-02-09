package com.POS_system_backend.repository;

import com.POS_system_backend.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByStoreAdminId(Long userId);

    @Query("SELECT s FROM Store s JOIN s.employees e WHERE e.id = :employeeId")
    List<Store> findByEmployeeId(@Param("employeeId") Long employeeId);
}
