package com.POS_system_backend.repository;

import com.POS_system_backend.entity.TrialAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrialAccountRepository extends JpaRepository<TrialAccount, Long> {
    Optional<TrialAccount> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<TrialAccount> findByEmailAndActiveTrue(String email);
}