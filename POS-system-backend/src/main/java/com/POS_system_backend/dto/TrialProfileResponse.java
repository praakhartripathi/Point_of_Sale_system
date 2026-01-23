package com.POS_system_backend.dto;

import java.time.LocalDateTime;

public class TrialProfileResponse {
    private Long id;
    private String businessName;
    private String ownerName;
    private String email;
    private String mobile;
    private String plan;
    private boolean active;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int maxBranches;
    private int maxUsers;

    public TrialProfileResponse() {
    }

    public TrialProfileResponse(Long id, String businessName, String ownerName, String email, String mobile, String plan, boolean active, LocalDateTime startDate, LocalDateTime endDate, int maxBranches, int maxUsers) {
        this.id = id;
        this.businessName = businessName;
        this.ownerName = ownerName;
        this.email = email;
        this.mobile = mobile;
        this.plan = plan;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
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
