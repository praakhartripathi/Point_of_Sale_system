package com.POS_system_backend.repository;

import com.POS_system_backend.entity.DemoRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoRequestRepository extends JpaRepository<DemoRequest, Long> {
}
