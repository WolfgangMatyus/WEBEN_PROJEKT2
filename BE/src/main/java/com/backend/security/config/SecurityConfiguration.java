package com.backend.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Value("${spring.websecurity.debug:false}")
  boolean webSecurityDebug;

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.debug(webSecurityDebug);
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    System.out.println(PathRequest.toStaticResources().atCommonLocations());
    http
        .csrf()
        .disable()
        .authorizeHttpRequests((authorize) -> authorize
          // resources
          .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
          .requestMatchers(HttpMethod.GET, "/resources/**").permitAll()
          .requestMatchers(HttpMethod.GET, "/resources/user/**").hasAnyRole("USER", "ADMIN")
          .requestMatchers(HttpMethod.GET, "/resources/admin/**").hasAnyRole("ADMIN")
          // pages
          .requestMatchers(HttpMethod.GET, "/").permitAll()
          .requestMatchers(HttpMethod.GET, "/registration").permitAll()
          .requestMatchers(HttpMethod.GET, "/login").permitAll()
          .requestMatchers(HttpMethod.GET,"/about").permitAll()
          .requestMatchers(HttpMethod.GET,"/cart").permitAll()
          .requestMatchers(HttpMethod.GET,"/home").permitAll()
          .requestMatchers(HttpMethod.GET,"/invoices").hasAnyRole("USER", "ADMIN")
          .requestMatchers(HttpMethod.GET,"/orders").hasAnyRole("USER", "ADMIN")
          .requestMatchers(HttpMethod.GET,"/profile").hasAnyRole("USER", "ADMIN")
          .requestMatchers(HttpMethod.GET,"/customermanager").hasAnyRole("ADMIN")
          .requestMatchers(HttpMethod.GET,"/productmanager").hasAnyRole("ADMIN")

          // api
          .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
          .requestMatchers(HttpMethod.GET,"/api/v1/shop/**").permitAll()
          .requestMatchers(HttpMethod.GET,"/api/v1/user/**").hasAnyRole("USER", "ADMIN")
          .requestMatchers(HttpMethod.GET,"/api/v1/admin/**").hasAnyRole("ADMIN")
          .requestMatchers(HttpMethod.GET,"/vouchermanager").hasAnyRole("ADMIN")
          .anyRequest().authenticated()
        ).formLogin()
            .loginPage("/login")
            .permitAll()
        .and()
          .sessionManagement()
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
          .rememberMe()
            .key("uniqueSecretKey") // einzigartiger geheimer Schlüssel zur Sicherheit
            .rememberMeCookieName("customRememberMeCookie") // benutzerdefinierter Name für das Remember Me-Cookie
            .tokenValiditySeconds(43200) // Gültigkeitsdauer des Cookies in Sekunden (hier: 12 Stunden)
        .and()
          .authenticationProvider(authenticationProvider)
          .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
          .logout()
          .logoutUrl("/api/v1/auth/logout")
          .addLogoutHandler(logoutHandler)
          .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        .and()
          .exceptionHandling()
    ;

    return http.build();
  }
}