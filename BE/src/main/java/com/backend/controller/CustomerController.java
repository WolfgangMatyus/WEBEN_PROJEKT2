package com.backend.controller;

import com.backend.entity.Cart;
import com.backend.security.user.User;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class CustomerController {
    private final UserService userService;

    @GetMapping("/get")
    public ResponseEntity<String> getCustomer() {
        return ResponseEntity.ok("CUSTOMER WORKS");
    }

    @GetMapping("/{userID}")
    public ResponseEntity<User> getUserById(@PathVariable("userID") Integer userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/cart")
    public List<Cart> getUserCart(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        User user = userService.getActiveUser();
        List<Cart> cartlist = userService.getCartByUser(user);
        return cartlist;
    }

    @PostMapping("/{userId}/cart")
    public ResponseEntity<Cart> createCart(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        Cart createdCart = userService.createCart(user);
        return ResponseEntity.ok(createdCart);
    }

}

