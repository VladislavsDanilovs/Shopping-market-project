package com.vladdanilov.springbootecommerce.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
//@Data if you are using @Data when using relationship OneToMany and ManyToOne, may happen bug, so better to use in this case:
// (@Getter and @Setter are also lombok annotations)
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "categoryId",
    cascade = CascadeType.ALL)
    private Set<Product> products;
}
