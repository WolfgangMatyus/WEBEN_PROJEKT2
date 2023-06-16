package com.backend.security.auth;

import com.backend.security.config.JwtService;
import com.backend.security.token.Token;
import com.backend.security.token.TokenRepository;
import com.backend.security.token.TokenType;
import com.backend.security.user.Role;
import com.backend.security.user.User;
import com.backend.security.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.web.bind.annotation.RequestBody;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private UserDetailsService userDetailsService;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.ROLE_USER)
        .build();
    var savedUser = repository.save(user);
//    var jwtToken = jwtService.generateToken(user);
//    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
//        .token(jwtToken)
        .build();
  }

//  public void authenticate(HttpServletRequest request, HttpServletResponse response) throws IOException {
//
//    String username = request.getParameter("email");
//    String password = request.getParameter("password");
//
//
//    authenticationManager.authenticate(
//        new UsernamePasswordAuthenticationToken(
//              username,
//              password
//        )
//    );
//
//
//    var user = repository.findByEmail(username)
//            .orElseThrow();
//
//
//    String key = "your-remember-me-key";
//
//
//    PersistentTokenBasedRememberMeServices rememberMeServices = new PersistentTokenBasedRememberMeServices(key, userDetailsService, tokenRepository);
//    RememberMeServices rememberMe = rememberMeServices;
//
//    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//    rememberMe.loginSuccess(request, response, authentication);
//
//
//
//
//////    var jwtToken = jwtService.generateToken(user);
////    revokeAllUserTokens(user);
////    saveUserToken(user, jwtToken);
////
////    // Cookie erstellen und setzen
////    Cookie cookie = new Cookie("sessionToken", jwtToken);
////    cookie.setPath("/");
////    cookie.setHttpOnly(true);
////    cookie.setMaxAge(86400);
////    cookie.setSecure(false);
////
////    response.addCookie(cookie);
////    // Setzen des HTTP-Statuscodes auf 200 (OK)
////    response.setStatus(HttpServletResponse.SC_OK);
////    // Erstellen der AuthenticationResponse mit den gewünschten Feldern
////
////    //AuthenticationResponse authenticationResponse = new AuthenticationResponse("success", HttpStatus.OK.value(), "Login successful!");
////
////    // Response mit dem JSON-Objekt zurückgeben
////    response.setContentType("application/json");
////    response.setCharacterEncoding("UTF-8");
//
//    // Erstellen und Senden der JSON-Antwort
//    PrintWriter writer = response.getWriter();
//    writer.println("{\"status\": \"success\", \"statusCode\": " + HttpServletResponse.SC_OK + "}");
//  }


  public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
    // Führen Sie die Authentifizierungslogik durch und überprüfen Sie die Anmeldeinformationen

    // Wenn die Authentifizierung erfolgreich ist, generieren Sie den JWT-Token
//    UserDetails userDetails = loadUserByUsername(authenticationRequest.getUsername());

    String username = request.getEmail();
    String password = request.getPassword();

    var user = repository.findByEmail(username)
            .orElseThrow();

    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);

////     Setzen Sie den JWT-Token als Bearer-Cookie im Browser
//    Cookie cookie = new Cookie("Authorization", "Bearer" + jwtToken);
//    cookie.setPath("/");
//    cookie.setMaxAge(86400);
//    cookie.setHttpOnly(true);
//    cookie.setSecure(false);
//    // Weitere Cookie-Eigenschaften setzen (z. B. secure, maxAge, etc.)
//    response.addCookie(cookie);

//    String testa = "; Max-Age=86400; Expires=Fri, 16 Jun 2023 10:20:44 GMT; Path=/; HttpOnly";

//    response.setHeader("Set-Cookie", "Authorization=Bearer " + jwtToken + testa);
//    response.setHeader("Authorization", "Bearer " + jwtToken);
//    response.addHeader("Authorization", jwtToken);
//    sessionStorage.setItem('jwtToken', 'your-jwt-token');

    // Geben Sie die AuthenticationResponse zurück, falls erforderlich
    AuthenticationResponse authenticationResponse = new AuthenticationResponse("Success", 200, "authenticated", jwtToken);
    return authenticationResponse;
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }



}
