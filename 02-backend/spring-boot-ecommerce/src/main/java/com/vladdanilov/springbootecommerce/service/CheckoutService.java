package com.vladdanilov.springbootecommerce.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.vladdanilov.springbootecommerce.dto.PaymentInfo;
import com.vladdanilov.springbootecommerce.dto.Purchase;
import com.vladdanilov.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
