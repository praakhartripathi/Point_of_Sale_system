package com.POS_system_backend.entity;

import com.POS_system_backend.entity.enums.StoreStatus;
import com.POS_system_backend.entity.enums.StoreType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @OneToOne
    @JoinColumn(name = "admin_id")
    private User storeAdmin;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> employees = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "parent_store_id")
    private Store parentStore;

    @OneToMany(mappedBy = "parentStore", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Store> branches = new ArrayList<>();

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String description;

    @Enumerated(EnumType.STRING)
    private StoreType storeType;

    @Enumerated(EnumType.STRING)
    private StoreStatus status;

    @Embedded
    private StoreContact contact;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = StoreStatus.INACTIVE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
