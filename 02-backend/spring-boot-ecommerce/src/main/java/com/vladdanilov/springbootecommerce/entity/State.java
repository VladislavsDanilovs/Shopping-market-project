package com.vladdanilov.springbootecommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "state")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "country.id", nullable = false)
    private Country country;
}
