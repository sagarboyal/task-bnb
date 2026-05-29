package com.main.backend.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.main.backend.dtos.UserSuggestion;
import com.main.backend.model.UserDetail;

public interface UserRepo extends JpaRepository<UserDetail, String>{
    Optional<UserDetail> findByEmail(String email);
    @Query("SELECT u FROM UserDetail u WHERE TRIM(u.userCode) = :userCode")
    Optional<UserDetail> findByUserCode(@Param("userCode") String userCode);

    @Query("""
            SELECT u FROM UserDetail u
            WHERE TRIM(u.code) = :term
               OR LOWER(TRIM(u.name)) = LOWER(:term)
               OR LOWER(TRIM(u.email)) = LOWER(:term)
            """)
    Optional<UserDetail> findByLoginDetails(@Param("term") String term);

    @Query("""
            SELECT u FROM UserDetail u
            WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%'))
               OR LOWER(:term) LIKE LOWER(CONCAT('%', u.name, '%'))
               OR LOWER(u.email) LIKE LOWER(CONCAT('%', :term, '%'))
            """)
    Optional<UserDetail> findByLoginDetailsLike(@Param("term") String term);

    @Query("""
            SELECT new com.main.backend.dtos.UserSuggestion(u.code, u.name, u.email, u.userCode)
            FROM UserDetail u
            WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%'))
               OR LOWER(u.code) LIKE LOWER(CONCAT('%', :term, '%'))
               OR LOWER(u.email) LIKE LOWER(CONCAT('%', :term, '%'))
            ORDER BY u.code
            """)
    List<UserSuggestion> findSuggestions(@Param("term") String term);

    @Query("SELECT MAX(u.code) FROM UserDetail u WHERE u.code LIKE CONCAT(:prefix, '%')")
    Optional<String> findMaxCodeWithPrefix(@Param("prefix") String prefix);

    @Query("SELECT MAX(u.userCode) FROM UserDetail u")
    Optional<String> findMaxUserCode();

}
