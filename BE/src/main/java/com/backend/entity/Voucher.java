package com.backend.entity;

import com.backend.security.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Voucher {

    @Id
    @GeneratedValue
    private Integer voucherNumber;

    private float amount;

    private LocalDate validUntil;

    //@ManyToOne
    //@JoinColumn(name = "user_id")
    private Integer userId;

    public Integer getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(Integer voucherNumber) {
        this.voucherNumber = voucherNumber;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public LocalDate getValid_until() {
        return validUntil;
    }

    public void setValid_until(LocalDate validUntil) {
        this.validUntil = validUntil;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUser(Integer userId) {
        this.userId = userId;
    }

}
