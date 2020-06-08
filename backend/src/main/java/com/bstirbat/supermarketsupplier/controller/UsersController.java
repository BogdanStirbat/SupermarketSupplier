package com.bstirbat.supermarketsupplier.controller;

import com.bstirbat.supermarketsupplier.entity.User;
import com.bstirbat.supermarketsupplier.repository.UserRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/current-user")
    public User getCurrentUser(OAuth2Authentication authentication) {
        String username = (String) authentication.getUserAuthentication().getPrincipal();

        User user = userRepository.findByUsername(username);

        return user;
    }
}
