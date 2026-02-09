package com.POS_system_backend.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreContact {
    private String address;
    private String phone;
    @Email(message = "invalid email format")
    private String email;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
