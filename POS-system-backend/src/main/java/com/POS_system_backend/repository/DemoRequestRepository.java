package com.POS_system_backend.repository;

import com.POS_system_backend.dto.StoreRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoRequestRepository extends JpaRepository<StoreRequest.DemoRequest, Long> {
}
