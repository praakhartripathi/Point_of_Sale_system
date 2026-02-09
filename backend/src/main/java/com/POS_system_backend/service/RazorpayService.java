package com.POS_system_backend.service;

import com.POS_system_backend.dto.OrderRequest;
import com.POS_system_backend.dto.PaymentResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {
    PaymentResponse createOrder(OrderRequest orderRequest) throws RazorpayException;
}
