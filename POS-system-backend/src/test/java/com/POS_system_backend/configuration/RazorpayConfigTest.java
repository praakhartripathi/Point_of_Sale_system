package com.POS_system_backend.configuration;

import com.razorpay.RazorpayClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {
    "razorpay.key.id=test_key_id",
    "razorpay.key.secret=test_key_secret"
})
public class RazorpayConfigTest {

    @Autowired
    private RazorpayClient razorpayClient;

    @Test
    public void testRazorpayClientBeanCreation() {
        assertNotNull(razorpayClient, "RazorpayClient bean should be created");
    }
}
