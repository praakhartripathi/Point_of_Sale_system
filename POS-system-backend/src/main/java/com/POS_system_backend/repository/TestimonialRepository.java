package com.POS_system_backend.repository;

import com.POS_system_backend.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByIsActiveTrue();
    List<Testimonial> findByIsFeaturedTrueAndIsActiveTrue();
}
