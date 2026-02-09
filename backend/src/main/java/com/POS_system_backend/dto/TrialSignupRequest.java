package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class TrialSignupRequest {
    @Schema(description = "Name of the business", example = "My Awesome Store")
    private String businessName;

    @Schema(description = "Name of the business owner", example = "John Doe")
    private String ownerName;

    @Schema(description = "Email address of the owner", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Mobile number of the owner", example = "9876543210")
    private String mobile;

    @Schema(description = "Password for the account", example = "password123")
    private String password;

    public TrialSignupRequest() {
    }

    public TrialSignupRequest(String businessName, String ownerName, String email, String mobile, String password) {
        this.businessName = businessName;
        this.ownerName = ownerName;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}