package com.main.backend.dtos;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank(message = "Username is required")
    @JsonAlias("email")
    String username,

    @NotBlank(message = "Password is required")
    String password
) {}
