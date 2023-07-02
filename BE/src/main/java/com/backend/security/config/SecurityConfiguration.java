package com.backend.security.config;

import com.backend.security.token.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;
import java.util.Arrays;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  private final TokenRepository tokenRepository;

  @Autowired
  private UserDetailsService userDetailsService;

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
          .requestMatchers(HttpMethod.GET, "/**").permitAll()
//          .requestMatchers(HttpMethod.GET, "/registration").permitAll()
//          .requestMatchers(HttpMethod.GET, "/login").permitAll()
//          .requestMatchers(HttpMethod.GET,"/about").permitAll()
//          .requestMatchers(HttpMethod.GET,"/cart").permitAll()
//          .requestMatchers(HttpMethod.GET,"/home").permitAll()
//          .requestMatchers(HttpMethod.GET,"/invoices").hasAnyRole("USER", "ADMIN")
//          .requestMatchers(HttpMethod.GET,"/orders").hasAnyRole("USER", "ADMIN")
//          .requestMatchers(HttpMethod.GET,"/profile").hasAnyRole("USER", "ADMIN")
//          .requestMatchers(HttpMethod.GET,"/customermanager").hasAnyRole("ADMIN")
//          .requestMatchers(HttpMethod.GET,"/productmanager").hasAnyRole("ADMIN")
//          .requestMatchers(HttpMethod.GET,"/vouchermanager").hasAnyRole("ADMIN")
          // api
          .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
          .requestMatchers(HttpMethod.GET,"/api/v1/shop/**").permitAll()
          .requestMatchers(HttpMethod.POST,"/api/v1/shop/**").permitAll()
          .requestMatchers(HttpMethod.DELETE,"/api/v1/shop/**").permitAll()
          .requestMatchers(HttpMethod.PUT,"/api/v1/shop/**").permitAll()
          .requestMatchers(HttpMethod.GET,"/api/v1/user/**").permitAll()
          .requestMatchers(HttpMethod.POST,"/api/v1/user/**").permitAll()
          .requestMatchers(HttpMethod.PUT,"/api/v1/user/**").permitAll()
          .requestMatchers(HttpMethod.GET,"/api/v1/admin/**").permitAll()
          .requestMatchers(HttpMethod.PUT,"/api/v1/admin/**").permitAll()
          .requestMatchers(HttpMethod.DELETE,"/api/v1/admin/**").permitAll()
          .requestMatchers(HttpMethod.POST,"/api/v1/admin/**").hasAnyRole("ADMIN")
          .anyRequest().authenticated()
        ).formLogin()
            .loginPage("/login")
            .permitAll()
        .and()
          .sessionManagement()
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        .and()
//          .rememberMe()
//          .key("my-unique-remember-me-key")
//          .userDetailsService(userDetailsService)
//          .tokenRepository(persistentTokenRepository())
//          .tokenValiditySeconds(86400) // Gültigkeit des Tokens in Sekunden
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

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:8181")); // Erlaubte Ursprünge anpassen
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // Erlaubte Methoden anpassen
    configuration.setAllowCredentials(true); // Cookies erlauben
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Erlaubte Header anpassen

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}