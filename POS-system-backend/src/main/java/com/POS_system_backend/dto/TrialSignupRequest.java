package com.POS_system_backend.dto;

public class TrialSignupRequest {
    private String businessName;
    private String ownerName;
    private String email;
    private String mobile;
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