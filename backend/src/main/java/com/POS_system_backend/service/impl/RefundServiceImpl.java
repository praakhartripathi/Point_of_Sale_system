package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.RefundDto;
import com.POS_system_backend.entity.*;
import com.POS_system_backend.mapper.RefundMapper;
import com.POS_system_backend.repository.*;
import com.POS_system_backend.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RefundServiceImpl implements RefundService {

    @Autowired
    private RefundRepository refundRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private ShiftReportRepository shiftReportRepository;

    @Autowired
    private RefundMapper refundMapper;

    @Override
    public RefundDto createRefund(RefundDto refundDto) {
        Refund refund = refundMapper.toEntity(refundDto);

        if (refundDto.getOrderId() != null) {
            Optional<Order> orderOptional = orderRepository.findById(refundDto.getOrderId());
            if (orderOptional.isPresent()) {
                refund.setOrder(orderOptional.get());
            } else {
                throw new RuntimeException("Order not found with id: " + refundDto.getOrderId());
            }
        }

        if (refundDto.getCashierId() != null) {
            Optional<User> userOptional = userRepository.findById(refundDto.getCashierId());
            if (userOptional.isPresent()) {
                refund.setCashier(userOptional.get());
            } else {
                throw new RuntimeException("Cashier (User) not found with id: " + refundDto.getCashierId());
            }
        }

        if (refundDto.getBranchId() != null) {
            Optional<Branch> branchOptional = branchRepository.findById(refundDto.getBranchId());
            if (branchOptional.isPresent()) {
                refund.setBranch(branchOptional.get());
            } else {
                throw new RuntimeException("Branch not found with id: " + refundDto.getBranchId());
            }
        }

        if (refundDto.getShiftReportId() != null) {
            Optional<ShiftReport> shiftReportOptional = shiftReportRepository.findById(refundDto.getShiftReportId());
            if (shiftReportOptional.isPresent()) {
                refund.setShiftReport(shiftReportOptional.get());
            } else {
                throw new RuntimeException("ShiftReport not found with id: " + refundDto.getShiftReportId());
            }
        }

        Refund savedRefund = refundRepository.save(refund);
        return refundMapper.toDto(savedRefund);
    }

    @Override
    public List<RefundDto> getAllRefunds() {
        List<Refund> refunds = refundRepository.findAll();
        List<RefundDto> refundDtos = new ArrayList<>();
        for (Refund refund : refunds) {
            refundDtos.add(refundMapper.toDto(refund));
        }
        return refundDtos;
    }

    @Override
    public List<RefundDto> getRefundsByCashierId(Long cashierId) {
        List<Refund> refunds = refundRepository.findByCashierId(cashierId);
        List<RefundDto> refundDtos = new ArrayList<>();
        for (Refund refund : refunds) {
            refundDtos.add(refundMapper.toDto(refund));
        }
        return refundDtos;
    }

    @Override
    public List<RefundDto> getRefundsByShiftReportId(Long shiftReportId) {
        List<Refund> refunds = refundRepository.findByShiftReportId(shiftReportId);
        List<RefundDto> refundDtos = new ArrayList<>();
        for (Refund refund : refunds) {
            refundDtos.add(refundMapper.toDto(refund));
        }
        return refundDtos;
    }

    @Override
    public List<RefundDto> getRefundsByBranchId(Long branchId) {
        List<Refund> refunds = refundRepository.findByBranchId(branchId);
        List<RefundDto> refundDtos = new ArrayList<>();
        for (Refund refund : refunds) {
            refundDtos.add(refundMapper.toDto(refund));
        }
        return refundDtos;
    }

    @Override
    public RefundDto getRefundById(Long refundId) {
        Optional<Refund> refundOptional = refundRepository.findById(refundId);
        if (refundOptional.isPresent()) {
            return refundMapper.toDto(refundOptional.get());
        } else {
            throw new RuntimeException("Refund not found with id: " + refundId);
        }
    }

    @Override
    public void deleteRefund(Long refundId) {
        if (refundRepository.existsById(refundId)) {
            refundRepository.deleteById(refundId);
        } else {
            throw new RuntimeException("Refund not found with id: " + refundId);
        }
    }
}
