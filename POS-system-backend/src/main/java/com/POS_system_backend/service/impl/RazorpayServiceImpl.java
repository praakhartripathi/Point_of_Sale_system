package com.POS_system_backend.service.impl;

import com.POS_system_backend.dto.OrderRequest;
import com.POS_system_backend.dto.PaymentResponse;
import com.POS_system_backend.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayServiceImpl implements RazorpayService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    public RazorpayServiceImpl(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    @Override
    public PaymentResponse createOrder(OrderRequest orderRequest) throws RazorpayException {
        JSONObject orderRequestJson = new JSONObject();
        orderRequestJson.put("amount", orderRequest.getAmount() * 100);
        orderRequestJson.put("currency", orderRequest.getCurrency());
        orderRequestJson.put("receipt", orderRequest.getReceipt());

        Order order = razorpayClient.orders.create(orderRequestJson);

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setOrderId(order.get("id"));
        paymentResponse.setRazorpayKeyId(razorpayKeyId);
        paymentResponse.setAmount(orderRequest.getAmount());
        paymentResponse.setCurrency(orderRequest.getCurrency());
        paymentResponse.setCompanyName("My Company"); // Add your company name

        return paymentResponse;
    }
}
