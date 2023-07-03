package com.backend.service;

import com.backend.entity.Invoice;
import com.backend.entity.Product;
import com.backend.entity.Voucher;
import com.backend.repository.CartRepository;
import com.backend.repository.InvoiceRepository;
import com.backend.repository.ProductRepository;
import com.backend.repository.VoucherRepository;
import com.backend.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Component
public class ShopService {
    private final ProductRepository productRepository;
    private final VoucherRepository voucherRepository;
    
    private final InvoiceRepository invoiceRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public float checkVoucher(Integer voucher_id){
        return voucherRepository.getReferenceById(voucher_id).getAmount();
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


    public Voucher createVoucher(Voucher voucher) {return voucherRepository.save(voucher);
    }

    public List<Voucher> getAllVoucher() {return voucherRepository.findAll();
    }
/*
    public float getAmount(Integer voucherId) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(voucherId);

        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            return voucher.getAmount();
        } else {
            throw new IllegalArgumentException("Voucher with ID " + voucherId + " not found");
        }
    }
*/

    public ResponseEntity<String> detractVoucher(Integer voucherId, Voucher voucher) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(voucherId);

        if (optionalVoucher.isPresent()) {
            Voucher voucherToUpdate = optionalVoucher.get();
            float updatedAmount = voucherToUpdate.getAmount() - voucher.getAmount();
            voucherToUpdate.setAmount(updatedAmount);
            voucherRepository.save(voucherToUpdate);

            return ResponseEntity.ok("Voucher with ID: " + voucherId + " has a new amount of " + voucherToUpdate.getAmount() + ".");
        } else {
            throw new IllegalArgumentException("Voucher with ID " + voucherId + " not found");
        }
    }

    public void updateVoucher(Integer voucherId, Voucher voucher) {

    }

    public void deleteVoucher(Integer voucherId){
        voucherRepository.deleteById(voucherId);
    }

    public Voucher getVoucherById(Integer voucherId) {
        return voucherRepository.findById(voucherId).orElse(null);
    }

    public Invoice createInvoice(Invoice invoice) {return invoiceRepository.save(invoice);
    }

    public List<Invoice> getInvoiceByUserID(User user) {return invoiceRepository.findByUserId(user.getId());}

    public List<Invoice> getAllInvoices() {return invoiceRepository.findAll();
    }

    public void updateInvoice(Integer invoice_id, Invoice invoice) {
        Invoice invoiceToUpdate = invoiceRepository.getReferenceById(invoice_id);
        if (invoiceToUpdate != null) {
            invoiceToUpdate.setInvoiceEntries(invoice.getInvoiceEntries());
            invoiceToUpdate.setTotal(invoice.getTotal());
            invoiceToUpdate.setUser(invoice.getUser());
            invoiceRepository.save(invoiceToUpdate);
        }
    }

    public Invoice getInvoiceById(Integer invoiceId) {return invoiceRepository.findById(invoiceId).orElse(null);
    }

    public void deleteInvoice(Integer invoiceId) {invoiceRepository.deleteById(invoiceId);
    }
}

