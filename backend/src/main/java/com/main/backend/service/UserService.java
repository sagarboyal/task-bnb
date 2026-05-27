package com.main.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.main.backend.dtos.UserDto;
import com.main.backend.dtos.UserSuggestion;
import com.main.backend.model.Address;
import com.main.backend.model.User;
import com.main.backend.repository.UserRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepository;

    @Transactional 
    public UserDto saveUser(UserDto userRequest) {
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email Already Exists");
        }

        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setName(userRequest.getName());
        user.setFatherName(userRequest.getFatherName());
        user.setMotherName(userRequest.getMotherName());
        user.setCode(generateUniqueCode());
        user.setPhone(userRequest.getPhone());
        user.setNationality(userRequest.getNationality());
        user.setGender(userRequest.getGender());

        if (user.getAddresses() == null) {
            user.setAddresses(new ArrayList<>());
        }

        Stream.of(userRequest.getAddress1(), userRequest.getAddress2(), userRequest.getAddress3())
            .filter(Objects::nonNull)                 
            .map(String::trim)                       
            .filter(addr -> !addr.isEmpty())          
            .forEach(addrText -> {
                Address address = new Address();
                address.setAddress(addrText);
                address.setUser(user);                
                user.getAddresses().add(address);     
            });

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    @Transactional
    public UserDto updateUser(UserDto userRequest, Integer id) {
        if (id == null) {
            throw new RuntimeException("Id is required");
        }
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        user.setEmail(getUpdatedValue(user.getEmail(), userRequest.getEmail()));
        user.setName(getUpdatedValue(user.getName(), userRequest.getName()));
        user.setFatherName(getUpdatedValue(user.getFatherName(), userRequest.getFatherName()));
        user.setMotherName(getUpdatedValue(user.getMotherName(), userRequest.getMotherName()));
        user.setPhone(getUpdatedValue(user.getPhone(), userRequest.getPhone()));
        user.setNationality(getUpdatedValue(user.getNationality(), userRequest.getNationality()));
        user.setGender(getUpdatedValue(user.getGender(), userRequest.getGender()));
        
        updateAddressAtIndex(user, 0, userRequest.getAddress1());
        updateAddressAtIndex(user, 1, userRequest.getAddress2());
        updateAddressAtIndex(user, 2, userRequest.getAddress3());
        
        return toResponse(userRepository.save(user));
    }


    public UserDto findUserByCode(String code){
        User user = userRepository.findByCode(code)
                            .orElseThrow(() -> new RuntimeException("User with this code not found"));
        return toResponse(user);
    }

    public UserDto findUserById(Integer id) {
        User user = userRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user);
    }

    public UserDto findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user);
    }

    public List<UserSuggestion> findUserByName(String name){
        return userRepository.findSuggestions(name.trim());
    }

    private void updateAddressAtIndex(User user, int index, String newAddressText) {
        if (user.getAddresses() == null) {
            user.setAddresses(new ArrayList<>());
        }

        List<Address> addresses = user.getAddresses();

        if (index < addresses.size()) {
            Address existingAddress = addresses.get(index);
            existingAddress.setAddress(getUpdatedValue(existingAddress.getAddress(), newAddressText));
        } else if (newAddressText != null && !newAddressText.trim().isEmpty()) {
            Address newAddress = new Address();
            newAddress.setAddress(newAddressText.trim());
            newAddress.setUser(user);
            addresses.add(newAddress);
        }
    }

    private UserDto toResponse(User user) {
        List<Address> address = user.getAddresses();
        return UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .name(user.getName())
            .fatherName(user.getFatherName())
            .motherName(user.getMotherName())
            .code(user.getCode())
            .phone(user.getPhone())
            .nationality(user.getNationality())
            .gender(user.getGender())
            .address1((address != null && address.size() > 0) ? address.get(0).getAddress() : null)
            .address2((address != null && address.size() > 1) ? address.get(1).getAddress() : null)
            .address3((address != null && address.size() > 2) ? address.get(2).getAddress() : null)
            .build();
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

    private String getUpdatedValue(String oldValue, String newValue) {
        if (oldValue != null && oldValue.equals(newValue) || newValue == null) {
            return oldValue; 
        }
        return newValue;
    }
}
