package com.POS_system_backend.repository;

import com.POS_system_backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByRazorpaySubscriptionId(String razorpaySubscriptionId);

    Optional<Subscription> findByUserId(Long userId);
}
