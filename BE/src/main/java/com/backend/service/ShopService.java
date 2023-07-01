package com.backend.service;

import com.backend.entity.Product;
import com.backend.repository.CartRepository;
import com.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Component
public class ShopService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public ResponseEntity<Product> updateProduct(Integer id, Product product) {
        Product productToUpdate = productRepository.getReferenceById(id);
        if (productToUpdate != null) {
            productToUpdate.setCategory(product.getCategory());
            productToUpdate.setDescription(product.getDescription());
            productToUpdate.setImg_path(product.getImg_path());
            productToUpdate.setRating(product.getRating());
            productToUpdate.setName(product.getName());
            productToUpdate.setPrice(product.getPrice());
            productRepository.save(productToUpdate);
            return ResponseEntity.ok(productToUpdate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    public void deleteProduct(Integer id){productRepository.deleteById(id);}


}

