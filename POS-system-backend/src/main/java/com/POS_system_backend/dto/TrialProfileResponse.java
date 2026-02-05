package com.POS_system_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public class TrialProfileResponse {
    @Schema(description = "Trial Account ID", example = "1")
    private Long id;

    @Schema(description = "Business Name", example = "My Awesome Store")
    private String businessName;

    @Schema(description = "Owner Name", example = "John Doe")
    private String ownerName;

    @Schema(description = "Owner Email", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Owner Mobile", example = "9876543210")
    private String mobile;

    @Schema(description = "Subscription Plan", example = "TRIAL")
    private String plan;

    @Schema(description = "Profile Image (Base64)", example = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==")
    private String profileImage;
    
    @JsonProperty("active")
    @Schema(description = "Account Active Status", example = "true")
    private boolean active;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Trial Start Date", example = "2023-10-27 10:00:00")
    private LocalDateTime trialStartDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Trial End Date", example = "2023-11-03 10:00:00")
    private LocalDateTime trialEndDate;
    
    @Schema(description = "Max Allowed Branches", example = "1")
    private int maxBranches;

    @Schema(description = "Max Allowed Users", example = "1")
    private int maxUsers;

    public TrialProfileResponse() {
    }

    public TrialProfileResponse(Long id, String businessName, String ownerName, String email, String mobile, String plan, String profileImage, boolean active, LocalDateTime trialStartDate, LocalDateTime trialEndDate, int maxBranches, int maxUsers) {
        this.id = id;
        this.businessName = businessName;
        this.ownerName = ownerName;
        this.email = email;
        this.mobile = mobile;
        this.plan = plan;
        this.profileImage = profileImage;
        this.active = active;
        this.trialStartDate = trialStartDate;
        this.trialEndDate = trialEndDate;
        this.maxBranches = maxBranches;
        this.maxUsers = maxUsers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    // Helper method for frontend display
    @Schema(description = "Status String", example = "Active")
    public String getStatus() {
        return active ? "Active" : "Inactive";
    }

    public LocalDateTime getTrialStartDate() {
        return trialStartDate;
    }

    public void setTrialStartDate(LocalDateTime trialStartDate) {
        this.trialStartDate = trialStartDate;
    }

    public LocalDateTime getTrialEndDate() {
        return trialEndDate;
    }

    public void setTrialEndDate(LocalDateTime trialEndDate) {
        this.trialEndDate = trialEndDate;
    }

    public int getMaxBranches() {
        return maxBranches;
    }

    public void setMaxBranches(int maxBranches) {
        this.maxBranches = maxBranches;
    }

    public int getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(int maxUsers) {
        this.maxUsers = maxUsers;
    }
}
