package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer/")
public class CustomerController {

    @GetMapping
    public ResponseEntity<String> getCustomer() {
        return ResponseEntity.ok("asdf");
    }

}

