package com.main.backend.controller;

import com.main.backend.model.Login;
import com.main.backend.repository.LoginRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.main.backend.dtos.LoginRequest;
import com.main.backend.dtos.RegisterRequest;
import com.main.backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final LoginRepository loginRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.badRequest().body("Login users must be created directly in database");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request, HttpServletRequest req) {
        if (!authService.login(request.username(), request.password(), req))
            throw new RuntimeException("Invalid Credential");
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/me")
    public ResponseEntity<Login> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(loginRepository.findByUsername(userDetails.getUsername()).get());
    }

}
