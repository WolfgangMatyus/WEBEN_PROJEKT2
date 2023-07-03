package com.backend.controller;

import com.backend.security.token.Token;
import com.backend.security.user.User;
import com.backend.security.user.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.security.Principal;
import java.util.Optional;

@Controller
public class TemplateController {

    private final UserRepository userRepository;

    public TemplateController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/registration")
    public String register() {
        return "authTemplates/registration";
    }

    @GetMapping("/login")
    public String login() {
        return "authTemplates/login";
    }

    @GetMapping("/about")
    public String about() {
        return "pages/about";
    }
    @GetMapping("/cart")
    public String cart() {
        return "pages/cart";
    }
    @GetMapping("/")
    public String home() {
        return "pages/home";
    }


    @GetMapping("/invoice")
    public String invoices() {
        return "user/invoice";
    }

    @GetMapping("/orders")
    public String orders() {
        return "user/orders";
    }

    @GetMapping("/profile")
    public String profile() {
        return "user/profile";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin/admin";
    }

    @GetMapping("/customermanager")
    public String customermanager() {
        return "admin/customermanager";
    }

    @GetMapping("/productmanager")
    public String productmanager() {
        return "admin/productmanager";
    }

    @GetMapping("/vouchermanager")
    public String vouchermanager() {

        // Benutzername aus Principal-Objekt abrufen
//        String username = principal.getName();

        // Benutzer anhand des Benutzernamens abrufen
//        Optional<User> userOptional = userRepository.findByEmail(username);

//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            Hibernate.initialize(user.getTokens()); // Manuell die tokens-Eigenschaft abrufen
//            // Weitere Verarbeitung der Admin-Seite
//
//            // Token-Wert dem Model hinzufügen
//            model.addAttribute("token", user.getToken());
//        } else {
//            // Benutzer nicht gefunden
//            System.out.println("User not found!");
//        }
//        String token = getActiveToken(); // Hier den aktiven Token abrufen, z. B. aus dem SecurityContext oder einer anderen Quelle
//        model.addAttribute("token", token);

        return "admin/vouchermanager";
    }

//    @ModelAttribute("activeToken")
//    public String getActiveToken() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication instanceof Token) {
//            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
//            String token = jwtAuthenticationToken.getToken().getTokenValue();
//            return token;
//        }
//        return null;
//    }

//    @GetMapping("/layout")
//    public String layout(Model model, Principal principal) {
//        String token = ""; // Hier den aktiven Token abrufen, z. B. aus dem SecurityContext oder einer anderen Quelle
//        model.addAttribute("token", token);
//        return "layout";
//    }


}
