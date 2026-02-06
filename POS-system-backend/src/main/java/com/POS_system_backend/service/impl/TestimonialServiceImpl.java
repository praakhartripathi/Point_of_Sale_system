package com.POS_system_backend.service.impl;

import com.POS_system_backend.entity.Testimonial;
import com.POS_system_backend.repository.TestimonialRepository;
import com.POS_system_backend.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialServiceImpl implements TestimonialService {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Override
    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @Override
    public Testimonial updateTestimonial(Long id, Testimonial testimonialDetails) {
        Testimonial testimonial = getTestimonialById(id);
        
        if (testimonialDetails.getCustomerName() != null) testimonial.setCustomerName(testimonialDetails.getCustomerName());
        if (testimonialDetails.getBusinessName() != null) testimonial.setBusinessName(testimonialDetails.getBusinessName());
        if (testimonialDetails.getBusinessType() != null) testimonial.setBusinessType(testimonialDetails.getBusinessType());
        if (testimonialDetails.getRating() > 0) testimonial.setRating(testimonialDetails.getRating());
        if (testimonialDetails.getTestimonialText() != null) testimonial.setTestimonialText(testimonialDetails.getTestimonialText());
        if (testimonialDetails.getImageUrl() != null) testimonial.setImageUrl(testimonialDetails.getImageUrl());
        if (testimonialDetails.getPlanType() != null) testimonial.setPlanType(testimonialDetails.getPlanType());
        
        // Boolean fields need careful handling if we want to allow setting them to false
        // Assuming the request object has the correct state
        testimonial.setFeatured(testimonialDetails.isFeatured());
        testimonial.setActive(testimonialDetails.isActive());

        return testimonialRepository.save(testimonial);
    }

    @Override
    public void deleteTestimonial(Long id) {
        if (testimonialRepository.existsById(id)) {
            testimonialRepository.deleteById(id);
        } else {
            throw new RuntimeException("Testimonial not found with id: " + id);
        }
    }

    @Override
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @Override
    public List<Testimonial> getActiveTestimonials() {
        return testimonialRepository.findByIsActiveTrue();
    }

    @Override
    public List<Testimonial> getFeaturedTestimonials() {
        return testimonialRepository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    @Override
    public Testimonial getTestimonialById(Long id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found with id: " + id));
    }
}
