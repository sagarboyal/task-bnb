package com.main.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.main.backend.model.Login;

public interface LoginRepository extends JpaRepository<Login, String> {
    Optional<Login> findByUsername(String username);

    @Query("SELECT MAX(l.userCode) FROM Login l")
    Optional<String> findMaxUserCode();
}
