package com.POS_system_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trial_accounts")
public class TrialAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessName;
    private String ownerName;

    @Column(unique = true)
    private String email;

    private String mobile;
    private String password; 

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;

    private String plan;
    private int maxBranches;
    private int maxUsers;

    public TrialAccount() {
    }

    public TrialAccount(Long id, String businessName, String ownerName, String email, String mobile, String password, LocalDateTime startDate, LocalDateTime endDate, boolean isActive, String plan, int maxBranches, int maxUsers) {
        this.id = id;
        this.businessName = businessName;
        this.ownerName = ownerName;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.plan = plan;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
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

     @PrePersist
    protected void onCreate() {
        if (this.startDate == null)
            this.startDate = LocalDateTime.now();

        if (this.endDate == null)
            this.endDate = this.startDate.plusDays(7);

        this.active = true;
        this.plan = "TRIAL";
        this.maxBranches = 1;
        this.maxUsers = 1;
    }
}