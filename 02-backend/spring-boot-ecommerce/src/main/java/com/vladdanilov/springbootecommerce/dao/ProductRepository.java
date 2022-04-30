package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/* Accept calls from web browser scripts from this origin
* scheme/protocol + hostname + post*/
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
