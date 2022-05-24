package com.vladdanilov.springbootecommerce.service;

import com.vladdanilov.springbootecommerce.dto.Purchase;
import com.vladdanilov.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
