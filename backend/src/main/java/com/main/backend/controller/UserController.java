package com.main.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.main.backend.dtos.UserDto;
import com.main.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<UserDto> getMethodName(@RequestParam String code) {
        return ResponseEntity.ok(userService.findUserByCode(code));
    }

    @PostMapping("register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto request) {
        return ResponseEntity.ok(userService.saveUser(request));
    }

    @PatchMapping("update/{id}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto request, @PathVariable Integer id) {
        return ResponseEntity.ok(userService.updateUser(request, id));
    }
}
