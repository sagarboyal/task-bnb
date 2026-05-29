package com.main.backend.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.main.backend.dtos.UserDto;
import com.main.backend.dtos.UserSuggestion;
import com.main.backend.model.Login;
import com.main.backend.model.UserDetail;
import com.main.backend.repository.LoginRepository;
import com.main.backend.repository.UserRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");

    private final UserRepo userRepository;
    private final LoginRepository loginRepository;

    @Transactional 
    public UserDto saveUser(UserDto userRequest) {
        if (userRequest.getEmail() != null && userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email Already Exists");
        }

        UserDetail user = new UserDetail();
        user.setEmail(userRequest.getEmail());
        user.setName(userRequest.getName());
        user.setFatherName(userRequest.getFatherName());
        user.setMotherName(userRequest.getMotherName());
        user.setCode(generateUniqueCode());
        user.setPhone(userRequest.getPhone());
        user.setDob(userRequest.getDob());
        user.setNationality(userRequest.getNationality());
        user.setGender(userRequest.getGender());
        user.setAddress1(userRequest.getAddress1());
        user.setAddress2(userRequest.getAddress2());
        user.setAddress3(userRequest.getAddress3());
        user.setUserCode(currentLoginUserCode());
        user.setEntryDate(new Date());
        user.setEntryTime(currentTime());
        user.setStatus("0");

        UserDetail savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    @Transactional
    public UserDto updateUser(UserDto userRequest, String code) {
        if (code == null || code.isBlank()) {
            throw new RuntimeException("Code is required");
        }
        
        UserDetail user = userRepository.findById(code)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(getUpdatedValue(user.getEmail(), userRequest.getEmail()));
        user.setName(getUpdatedValue(user.getName(), userRequest.getName()));
        user.setFatherName(getUpdatedValue(user.getFatherName(), userRequest.getFatherName()));
        user.setMotherName(getUpdatedValue(user.getMotherName(), userRequest.getMotherName()));
        user.setPhone(getUpdatedValue(user.getPhone(), userRequest.getPhone()));
        user.setDob(userRequest.getDob() == null ? user.getDob() : userRequest.getDob());
        user.setNationality(getUpdatedValue(user.getNationality(), userRequest.getNationality()));
        user.setGender(getUpdatedValue(user.getGender(), userRequest.getGender()));
        user.setAddress1(getUpdatedValue(user.getAddress1(), userRequest.getAddress1()));
        user.setAddress2(getUpdatedValue(user.getAddress2(), userRequest.getAddress2()));
        user.setAddress3(getUpdatedValue(user.getAddress3(), userRequest.getAddress3()));
        user.setStatus(getUpdatedValue(user.getStatus(), userRequest.getStatus()));
        user.setModifyUser(currentLoginUserCode());
        user.setModiDate(new Date());
        user.setModiTime(currentTime());
        
        return toResponse(userRepository.save(user));
    }


    public UserDto findUserByCode(String code){
        UserDetail user = userRepository.findById(code)
                            .orElseThrow(() -> new RuntimeException("User with this code not found"));
        return toResponse(user);
    }

    public UserDto findUserById(String code) {
        return findUserByCode(code);
    }

    public UserDto findUserByEmail(String email) {
        UserDetail user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user);
    }

    public List<UserSuggestion> findUserByName(String name){
        return userRepository.findSuggestions(name.trim());
    }

    public UserDto findUserByUsername(String username) {
        Login login = loginRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserDetail> user = Optional.empty();
        if (login.getUserCode() != null && !login.getUserCode().isBlank()) {
            user = userRepository.findByUserCode(login.getUserCode().trim());
        }

        if (user.isEmpty() && login.getUserDetails() != null && !login.getUserDetails().isBlank()) {
            String loginDetails = login.getUserDetails().trim();
            user = userRepository.findByLoginDetails(loginDetails);
            if (user.isEmpty()) {
                user = userRepository.findByLoginDetailsLike(loginDetails);
            }
        }

        return user.map(this::toResponse).orElseGet(() -> UserDto.builder()
                .userCode(trim(login.getUserCode()))
                .name(trim(login.getUserDetails()))
                .status("A")
                .build());
    }

    private UserDto toResponse(UserDetail user) {
        return UserDto.builder()
            .email(user.getEmail())
            .name(user.getName())
            .fatherName(user.getFatherName())
            .motherName(user.getMotherName())
            .code(user.getCode())
            .phone(user.getPhone())
            .dob(user.getDob())
            .nationality(user.getNationality())
            .gender(user.getGender())
            .address1(user.getAddress1())
            .address2(user.getAddress2())
            .address3(user.getAddress3())
            .userCode(user.getUserCode())
            .entryDate(user.getEntryDate())
            .entryTime(user.getEntryTime())
            .modifyUser(user.getModifyUser())
            .modiDate(user.getModiDate())
            .modiTime(user.getModiTime())
            .status(user.getStatus())
            .build();
    }

    private String generateUniqueCode() {
        String prefix = "AL";
        Optional<String> latestCodeOpt = userRepository.findMaxCodeWithPrefix(prefix);
        
        if (latestCodeOpt.isEmpty()) {
            return "AL001001";
        }
        
        String latestCode = latestCodeOpt.get();
        String numericPart = latestCode.substring(2);
        
        long nextNumber = Long.parseLong(numericPart) + 1;
        return String.format("%s%06d", prefix, nextNumber);
    }

    private String getUpdatedValue(String oldValue, String newValue) {
        if (oldValue != null && oldValue.equals(newValue) || newValue == null) {
            return oldValue; 
        }
        return newValue;
    }

    private String trim(String value) {
        return value == null ? null : value.trim();
    }

    private String currentLoginUserCode() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Logged in user is required");
        }

        return loginRepository.findByUsername(authentication.getName())
                .map(Login::getUserCode)
                .map(String::trim)
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));
    }

    private String currentTime() {
        return LocalTime.now().format(TIME_FORMATTER);
    }
}
