package com.backend.controller;

import com.backend.entity.Invoice;
import com.backend.entity.Product;
import com.backend.entity.Voucher;
import com.backend.security.user.User;
import com.backend.service.ShopService;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ShopService shopService;

    @GetMapping("/get")
    public ResponseEntity<String> getAdmin() {
        return ResponseEntity.ok("ADMIN WORKS");
    }

    @GetMapping("/users")
    public List<User> getAllUser(){return userService.getAllUser();}

    @PutMapping ("/user/{userID}")
    public ResponseEntity<User> updateUser(@PathVariable("userID") Integer userID, @RequestBody User user){
        User existingUser = userService.getUserById(userID);
        if (existingUser != null) {
            existingUser.setEmail(user.getEmail());
            existingUser.setFirstname(user.getFirstname());
            existingUser.setLastname(user.getLastname());
            //existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            existingUser.setActive(user.getActive());
            userService.saveUser(existingUser);
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @DeleteMapping("user/{userID}")
    public ResponseEntity<String> deleteUser(@PathVariable("userID") Integer userId){
        User UserToDelete = userService.getUserById(userId);
        if (UserToDelete != null) {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User with id: " + userId + " successfully deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("activateUser/{userID}")
    public ResponseEntity<String> activateUser(@PathVariable("userID") Integer userId){
        User UserToActivate = userService.getUserById(userId);
        if (UserToActivate != null) {
            userService.activateUser(userId);
            return ResponseEntity.ok("User with id: " + userId + " successfully activated!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("deactivateUser/{userID}")
    public ResponseEntity<String> deactivateUser(@PathVariable("userID") Integer userId){
        User UserToDeactivate = userService.getUserById(userId);
        if (UserToDeactivate != null) {
            userService.deactivateUser(userId);
            return ResponseEntity.ok("User with id: " + userId + " successfully deactivated!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
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

    @PostMapping("/voucher")
    public ResponseEntity<String> createVoucher(@RequestBody Voucher voucher){
        shopService.createVoucher(voucher);
        return ResponseEntity.ok("Voucher successfully created!");
    }

    @GetMapping("/voucher")
    public List<Voucher> getAllVoucher(){return shopService.getAllVoucher();}

    @PutMapping("/detractVoucher/{voucherId}")
    public ResponseEntity<String> detractVoucher(@PathVariable("voucherId") Integer voucherId, @RequestBody Voucher voucher){
        shopService.detractVoucher(voucherId, voucher);
        return ResponseEntity.ok("Amount " + voucher.getAmount() + " from Voucher successfully substracted!");
    }

    @PutMapping("/updateVoucher/{voucherId}")
    public ResponseEntity<String> updateVoucher(@PathVariable("voucherId") Integer voucherId, @RequestBody Voucher voucher){
        shopService.updateVoucher(voucherId, voucher);
        return ResponseEntity.ok("Amount " + voucher.getAmount() + " from Voucher successfully substracted!");
    }

    @DeleteMapping("/voucher/{voucherID}")
    public ResponseEntity<String> deleteVoucher(@PathVariable("voucherID") Integer voucherId){
        Voucher voucherToDelete = shopService.getVoucherById(voucherId);
        if (voucherToDelete != null) {
            shopService.deleteVoucher(voucherId);
            return ResponseEntity.ok("Voucher with id: " + voucherId + " successfully deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices(){return shopService.getAllInvoices();}

    @PutMapping("/{invoice_Id}")
    public ResponseEntity<String> updateInvoice(@PathVariable("invoice_Id") Integer invoice_Id, @RequestBody Invoice invoice){
        shopService.updateInvoice(invoice_Id, invoice);
        return ResponseEntity.ok("Invoice with ID: " + invoice.getId() + " successfully updated!");
    }

    @DeleteMapping("/invoice/{invoice_Id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable("invoice_Id") Integer invoiceId){
        Invoice invoiceToDelete = shopService.getInvoiceById(invoiceId);
        if (invoiceToDelete != null) {
            shopService.deleteInvoice(invoiceId);
            return ResponseEntity.ok("Invoice with id: " + invoiceId + " successfully deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
