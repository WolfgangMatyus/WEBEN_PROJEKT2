package com.backend.service;

import com.backend.entity.Cart;
import com.backend.repository.CartRepository;
import com.backend.security.token.TokenRepository;
import com.backend.security.user.User;
import com.backend.security.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final CartRepository cartRepository;

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User getActiveUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof User) {
                return (User) principal;
            }
        }
        return null;
    }

    public List<Cart> getCartByUser(User user) {
        return cartRepository.findByUserId(user.getId());
    }

    public Cart createCart(User user) {

        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public void deleteUser(Integer userId){
        userRepository.deleteById(userId);
    }
}
