package com.backend.config;

import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
public class ThymeleafConfig implements WebMvcConfigurer {

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        // Konfiguriere den TemplateEngine
        templateEngine.addDialect(new LayoutDialect());
        return templateEngine;
    }

    @Bean
    public LayoutDialect layoutDialect() {
        return new LayoutDialect();
    }

    // Weitere Konfigurationen und Bean-Definitionen ...

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Konfiguriere den Pfad für statische Ressourcen wie CSS- und JavaScript-Dateien
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }

}
