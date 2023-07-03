package com.backend.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String username;
  private String firstname;
  private String lastname;
  private String email;
  private String password;
  private Boolean active;
  private String address;
  private String payment;
  private String town;
  private String zip_code;

}
