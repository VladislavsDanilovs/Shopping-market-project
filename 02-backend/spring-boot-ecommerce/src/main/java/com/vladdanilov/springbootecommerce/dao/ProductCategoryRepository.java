package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
/* collectionResourceRel = "productCategory" NAME OF JSON ENTRY, path = "product-category" ACTUAL REFERENCE
* We're using this because we don't want to use default simple pluralized forms (adding s), so in this case better to use simple reference*/
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
}
