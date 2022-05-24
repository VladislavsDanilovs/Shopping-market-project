package com.vladdanilov.springbootecommerce.dto;

import com.vladdanilov.springbootecommerce.entity.Address;
import com.vladdanilov.springbootecommerce.entity.Customer;
import com.vladdanilov.springbootecommerce.entity.Order;
import com.vladdanilov.springbootecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
