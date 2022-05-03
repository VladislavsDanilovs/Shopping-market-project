package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

/* Accept calls from web browser scripts from this origin
* scheme/protocol + hostname + post*/
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    /* Query method, that match by category id, behind the scene spring will execute a query similar to:
    * SELECT * FROM product WHERE category_id=? */
    /* Also, Spring Data Rest automatically exposes endpoint
     http://localhost:8080/api/products/search/findByCategoryId?id=2 */

//    Page<Product> findByCategoryId(@RequestParam("id") Integer id, Pageable pageable);
Page<Product> findByCategoryId(@RequestParam("id") Integer id, Pageable pageable);

}
