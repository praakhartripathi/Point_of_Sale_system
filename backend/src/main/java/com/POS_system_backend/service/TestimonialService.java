package com.POS_system_backend.service;

import com.POS_system_backend.entity.Testimonial;

import java.util.List;

public interface TestimonialService {
    Testimonial createTestimonial(Testimonial testimonial);

    Testimonial updateTestimonial(Long id, Testimonial testimonial);

    void deleteTestimonial(Long id);

    List<Testimonial> getAllTestimonials();

    List<Testimonial> getActiveTestimonials();

    List<Testimonial> getFeaturedTestimonials();

    Testimonial getTestimonialById(Long id);
}
