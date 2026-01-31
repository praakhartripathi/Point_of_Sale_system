package com.POS_system_backend.dto;

public class TrialSignInRequest {
    private String email;
    private String password;

    public TrialSignInRequest() {
    }

    public TrialSignInRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}