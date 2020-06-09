package com.bstirbat.supermarketsupplier.repository;

import com.bstirbat.supermarketsupplier.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
