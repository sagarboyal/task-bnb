package com.main.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    Optional<User> findByEmail(String email);
    Optional<User> findByCode(String code);
    
    @Query("SELECT MAX(u.code) FROM User u WHERE u.code LIKE :prefix%")
    Optional<String> findMaxCodeWithPrefix(@Param("prefix") String prefix);

}
