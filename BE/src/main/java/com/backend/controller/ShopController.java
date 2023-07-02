package com.backend.controller;

import com.backend.entity.Product;
import com.backend.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/product")
    public ResponseEntity<String> createProduct(@RequestBody Product product){
        shopService.createProduct(product);
        return ResponseEntity.ok("new Product successfully created!");
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Integer id, @RequestBody Product product){
        shopService.updateProduct(id, product);
        return ResponseEntity.ok("Product with id: " + id + " successfully updated!");
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        shopService.deleteProduct(id);
        return ResponseEntity.ok("Product with id: " + id + " successfully deleted!");
    }

    // vouchercode
    @GetMapping("/voucher/{voucher_id}/valid")
    public ResponseEntity<Float> checkVoucher(@PathVariable("voucher_id") Integer voucher_id){
        return ResponseEntity.ok(shopService.checkVoucher(voucher_id));
    }

}
