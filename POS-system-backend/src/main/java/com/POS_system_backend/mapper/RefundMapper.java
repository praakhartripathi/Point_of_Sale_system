package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.RefundDto;
import com.POS_system_backend.entity.Refund;
import org.springframework.stereotype.Component;

@Component
public class RefundMapper {

    public RefundDto toDto(Refund refund) {
        if (refund == null) {
            return null;
        }
        RefundDto dto = new RefundDto();
        dto.setId(refund.getId());
        dto.setReason(refund.getReason());
        dto.setAmount(refund.getAmount());
        dto.setPaymentType(refund.getPaymentType());
        dto.setCreatedAt(refund.getCreatedAt());

        if (refund.getOrder() != null) {
            dto.setOrderId(refund.getOrder().getId());
        }
        if (refund.getCashier() != null) {
            dto.setCashierId(refund.getCashier().getId());
        }
        if (refund.getBranch() != null) {
            dto.setBranchId(refund.getBranch().getId());
        }
        return dto;
    }

    public Refund toEntity(RefundDto dto) {
        if (dto == null) {
            return null;
        }
        Refund refund = new Refund();
        refund.setId(dto.getId());
        refund.setReason(dto.getReason());
        refund.setAmount(dto.getAmount());
        refund.setPaymentType(dto.getPaymentType());
        return refund;
    }
}
