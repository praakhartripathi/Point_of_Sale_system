package com.POS_system_backend.controller;

import com.POS_system_backend.entity.Testimonial;
import com.POS_system_backend.service.TestimonialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@Tag(name = "Testimonial Controller", description = "Endpoints for managing testimonials")
public class TestimonialController {

    @Autowired
    private TestimonialService testimonialService;

    @Operation(summary = "Get all active testimonials", description = "Public endpoint to fetch active testimonials.")
    @GetMapping("/public")
    public ResponseEntity<List<Testimonial>> getActiveTestimonials() {
        return ResponseEntity.ok(testimonialService.getActiveTestimonials());
    }

    @Operation(summary = "Get featured testimonials", description = "Public endpoint to fetch featured testimonials.")
    @GetMapping("/public/featured")
    public ResponseEntity<List<Testimonial>> getFeaturedTestimonials() {
        return ResponseEntity.ok(testimonialService.getFeaturedTestimonials());
    }

    // Admin endpoints

    @Operation(summary = "Get all testimonials (Admin)", description = "Fetch all testimonials including inactive ones.")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @Operation(summary = "Create a testimonial (Admin)", description = "Create a new testimonial.")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @PostMapping
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        return new ResponseEntity<>(testimonialService.createTestimonial(testimonial), HttpStatus.CREATED);
    }

    @Operation(summary = "Update a testimonial (Admin)", description = "Update an existing testimonial.")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialService.updateTestimonial(id, testimonial));
    }

    @Operation(summary = "Delete a testimonial (Admin)", description = "Delete a testimonial.")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok("Testimonial deleted successfully");
    }
}
