package com.main.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String email;
    private String name;
    private String fatherName;
    private String motherName;
    private String code;
    private String phone;
    private String nationality;
    private String gender;
    private String address1;
    private String address2;
    private String address3;
}
