package com.backend.security.user;

import com.backend.security.token.Token;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@ToString(exclude = "tokens")
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Integer id;
  private String firstname;
  private String lastname;
  private String email;
  @JsonIgnore
  private String password;
  private Boolean active;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  @JsonIgnore
  private List<Token> tokens;

  public List<Token> getTokens() {
    return tokens;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }


  //Anrede
  // ii. Vorname
  // iii. Nachname
  // iv. Adresse
  // v. PLZ
  // vi. Ort
  // vii. Emailadresse
  // viii. Benutzername
  // ix. Passwort x.
  // Zahlungsinformationen

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Object getToken() {
    if (tokens != null && !tokens.isEmpty()) {
      return tokens.get(0).getToken(); // Annahme: Es gibt nur einen Token pro Benutzer
    }
    return null;
  }
}
