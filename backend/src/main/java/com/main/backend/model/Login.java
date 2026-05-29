package com.main.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Login")
public class Login {

    @Id
    @Column(name = "UserCode", length = 4, columnDefinition = "char(4)")
    private String userCode;

    @Column(name = "UserDetails", length = 50)
    private String userDetails;

    @Column(name = "UserName", length = 15)
    private String username;

    @Column(name = "Password", length = 8)
    private String password;
}
