package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // SELECT * FROM Customer c WHERE c.email = theEmail
    // Method returns null if not found
    Customer findByEmail(String theEmail);
}
