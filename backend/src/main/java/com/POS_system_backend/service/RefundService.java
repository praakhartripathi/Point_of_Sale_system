package com.POS_system_backend.service;

import com.POS_system_backend.dto.RefundDto;

import java.util.List;

public interface RefundService {
    RefundDto createRefund(RefundDto refundDto);

    List<RefundDto> getAllRefunds();

    List<RefundDto> getRefundsByCashierId(Long cashierId);

    List<RefundDto> getRefundsByShiftReportId(Long shiftReportId);

    List<RefundDto> getRefundsByBranchId(Long branchId);

    RefundDto getRefundById(Long refundId);

    void deleteRefund(Long refundId);
}
