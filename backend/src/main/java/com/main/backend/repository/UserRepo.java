package com.main.backend.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.backend.dtos.UserSuggestion;
import com.main.backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    Optional<User> findByEmail(String email);
    Optional<User> findByCode(String code);
    @Query("""
            SELECT new com.main.backend.dtos.UserSuggestion(u.id, u.name, u.email, u.code)
            FROM User u
            WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%'))
               OR LOWER(u.code) LIKE LOWER(CONCAT('%', :term, '%'))
            ORDER BY u.code
            """)
    List<UserSuggestion> findSuggestions(@Param("term") String term);

    @Query("SELECT MAX(u.code) FROM User u WHERE u.code LIKE :prefix%")
    Optional<String> findMaxCodeWithPrefix(@Param("prefix") String prefix);

}
