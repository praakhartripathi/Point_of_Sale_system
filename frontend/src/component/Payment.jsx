import React from 'react';

const Payment = () => {

    const handlePayment = async () => {
        try {
            const orderRequest = {
                amount: 100.00,
                currency: 'INR',
                receipt: 'receipt#1'
            };

            const response = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderRequest)
            });

            const paymentResponse = await response.json();

            const options = {
                key: paymentResponse.razorpayKeyId,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency,
                name: paymentResponse.companyName,
                description: 'Test Transaction',
                order_id: paymentResponse.orderId,
                handler: function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                },
                prefill: {
                    name: 'Your Name',
                    email: 'your.email@example.com',
                    contact: '9999999999'
                },
                notes: {
                    address: 'Your Address'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div>
            <h2>Payment Page</h2>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
