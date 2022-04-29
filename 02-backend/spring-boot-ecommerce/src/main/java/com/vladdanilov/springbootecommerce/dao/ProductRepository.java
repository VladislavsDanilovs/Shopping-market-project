package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
