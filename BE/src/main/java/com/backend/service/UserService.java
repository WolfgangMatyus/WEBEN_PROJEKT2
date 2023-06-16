package com.backend.service;

import com.backend.entity.Invoice;
import com.backend.entity.InvoiceRepository;
import com.backend.security.user.User;
import com.backend.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }
    public List<Invoice> getInvoicesByUserId(Integer userId) {
        return invoiceRepository.findByUserId(userId);
    }

    public Invoice createInvoice(User user) {

        Invoice invoice = new Invoice();
        invoice.setUser(user);
        return invoiceRepository.save(invoice);
    }
}
