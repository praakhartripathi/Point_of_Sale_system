package com.POS_system_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    @Schema(description = "Customer ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Customer Full Name", example = "Alice Smith", requiredMode = Schema.RequiredMode.REQUIRED)
    private String firstName; // Note: Field name is firstName but example implies full name. Consider renaming if it stores full name.

    @Schema(description = "Customer Email", example = "alice@example.com")
    private String email;

    @Schema(description = "Customer Phone", example = "9876543210")
    private String phone;

    @Schema(description = "Creation Date", example = "2023-10-27 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

    @Schema(description = "Modification Date", example = "2023-10-28 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedDate;

    @Schema(description = "Last Updated Date", example = "2023-10-28 10:00:00", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
