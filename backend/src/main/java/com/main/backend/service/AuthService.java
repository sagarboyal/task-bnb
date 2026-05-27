package com.main.backend.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContext;


import com.main.backend.model.User;
import com.main.backend.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public void register(String email, String password) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        String[] arr = email.split("@");
        String fallbackName = arr[0]; 

        User user = new User();
        user.setEmail(email);
        user.setName(fallbackName);
        user.setPassword(passwordEncoder.encode(password));
        user.setCode(generateUniqueCode());
        user.setPhone("1222");
        
        userRepository.save(user);
    }


    public boolean login(String email, String password, HttpServletRequest request){
        try{
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);
            var authentication = authenticationManager.authenticate(authToken);
        
            // 2. Set authentication into the Security Context
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
        
            // 3. Save the context into the session so Spring can remember it on next requests
            request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);
        
            return true;
        }catch(Exception e){
            return false;
        }
    }

    private String generateUniqueCode() {
        String prefix = "AL";
        Optional<String> latestCodeOpt = userRepository.findMaxCodeWithPrefix(prefix);
        
        if (latestCodeOpt.isEmpty()) {
            return "AL00010001";
        }
        
        String latestCode = latestCodeOpt.get();
        String numericPart = latestCode.substring(2);
        
        long nextNumber = Long.parseLong(numericPart) + 1;
        return String.format("%s%08d", prefix, nextNumber);
    }
}
