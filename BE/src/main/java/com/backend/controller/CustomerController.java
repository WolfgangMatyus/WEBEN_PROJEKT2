package com.backend.controller;

import com.backend.entity.Invoice;
import com.backend.security.user.User;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/{userId}/invoices")
    public List<Invoice> getUserInvoices(@PathVariable Integer userId) {
        return userService.getInvoicesByUserId(userId);
    }

    @PostMapping("/{userId}/invoice")
    public ResponseEntity<Invoice> createInvoice(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        Invoice createdInvoice = userService.createInvoice(user);
        return ResponseEntity.ok(createdInvoice);
    }

}

