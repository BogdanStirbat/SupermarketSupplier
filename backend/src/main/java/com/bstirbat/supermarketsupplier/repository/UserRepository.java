package com.bstirbat.supermarketsupplier.repository;

import com.bstirbat.supermarketsupplier.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
}
