package com.POS_system_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class TrialSignInRequest {
    @Schema(description = "Email address", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Password", example = "password123")
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