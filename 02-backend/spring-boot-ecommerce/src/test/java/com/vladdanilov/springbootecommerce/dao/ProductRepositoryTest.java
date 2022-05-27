package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.Product;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository underTest;
    private Pageable pageable;

    @Test
    @Disabled
    void itShouldFindByCategoryId() {
        // given
        Product product = new Product();
        int id = 5;
        product.setId(id);
        underTest.save(product);

        // when
        Page expected = underTest.findByCategoryId(id, pageable);

        // then
        //http://localhost:8080/api/products/search/findByCategoryId?id=2 */
    }

    @Test
    @Disabled
    void findByNameContaining() {
    }
}