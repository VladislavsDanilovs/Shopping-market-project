package com.vladdanilov.springbootecommerce.dao;

import com.vladdanilov.springbootecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "states", path = "states")
public interface StateRepository extends JpaRepository<State, Integer> {

    // http://localhost:8080/api/states/search/findByCountryCode?code=DE
    List<State> findByCountryCode(@Param("code") String code);
}
