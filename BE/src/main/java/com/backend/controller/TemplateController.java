package com.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TemplateController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/registration")
    public String register() {
        return "authTemplates/registration";
    }

    @GetMapping("/login")
    public String login() {
        return "authTemplates/login";
    }

}
