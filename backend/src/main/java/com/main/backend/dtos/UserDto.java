package com.main.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String code;
    private String name;
    private String fatherName;
    private String motherName;
    private String email;
    private String phone;
    private Date dob;
    private String gender;
    private String nationality;
    private String address1;
    private String address2;
    private String address3;
    private String userCode;
    private Date entryDate;
    private String entryTime;
    private String modifyUser;
    private Date modiDate;
    private String modiTime;
    private String status;
}
