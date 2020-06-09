package com.bstirbat.supermarketsupplier.controller;

import com.bstirbat.supermarketsupplier.entity.Product;
import com.bstirbat.supermarketsupplier.entity.Role;
import com.bstirbat.supermarketsupplier.entity.User;
import com.bstirbat.supermarketsupplier.exception.NotFoundException;
import com.bstirbat.supermarketsupplier.exception.UnauthorizedException;
import com.bstirbat.supermarketsupplier.model.CreateProductModel;
import com.bstirbat.supermarketsupplier.repository.ProductRepository;
import com.bstirbat.supermarketsupplier.repository.UserRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    private ProductRepository productRepository;
    private UserRepository userRepository;

    public ProductsController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Product> all(OAuth2Authentication authentication) {

        return (List<Product>) productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id, OAuth2Authentication authentication) {

        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException(String.format("Could not found a product with id %s", id)));

        return product;
    }

    @PostMapping
    public Product create(@Valid @RequestBody CreateProductModel createProductModel, OAuth2Authentication authentication) {
        if (authentication == null) {
            throw new UnauthorizedException(String.format("Only manager users have this permission."));
        }

        String username = (String) authentication.getUserAuthentication().getPrincipal();

        User user = userRepository.findByUsername(username);
        if (user.getRole() != Role.MANAGER_USER) {
            throw new UnauthorizedException(String.format("User %s doesn't has this permission.", username));
        }

        Product product = new Product();
        product.setName(createProductModel.getName());
        product.setQuantity(createProductModel.getQuantity());

        return productRepository.save(product);
    }
}
