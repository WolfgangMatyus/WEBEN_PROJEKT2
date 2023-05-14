package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {

    @GetMapping("/get")
    public ResponseEntity<String> getShop() {

        return ResponseEntity.ok("tes");
    }
}
