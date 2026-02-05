package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TrialUpdateProfileRequest {
    @Schema(description = "Updated business name", example = "My Awesome Store Updated")
    @NotBlank(message = "Business name is required")
    private String businessName;
    
    @Schema(description = "Updated owner name", example = "John Doe Updated")
    @NotBlank(message = "Owner name is required")
    private String ownerName;
    
    @Schema(description = "Updated mobile number", example = "9876543211")
    @NotBlank(message = "Mobile number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid mobile number"
    )
    private String mobile;
    
    @Schema(description = "Updated email address", example = "john.updated@example.com")
    @NotBlank(message = "Email is required")
    private String email;
    
    @Schema(description = "Base64 encoded profile image string")
    private String profileImage; // Base64 encoded string

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
