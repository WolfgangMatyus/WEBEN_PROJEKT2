package com.backend.controller;

import com.backend.entity.Product;
import com.backend.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping("/get")
    public ResponseEntity<String> getShop() {

        return ResponseEntity.ok("tes");
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return shopService.getAllProducts();
    }
}
