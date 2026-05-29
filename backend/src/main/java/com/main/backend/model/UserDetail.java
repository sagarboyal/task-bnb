package com.main.backend.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "UserDetails")
public class UserDetail {
    
    @Id
    @Column(name = "Code", length = 8)
    private String code;

    @Column(name = "Name", length = 50)
    private String name;

    @Column(name = "FatherName", length = 50)
    private String fatherName;

    @Column(name = "MotherName", length = 50)
    private String motherName;
    
    @Email
    @Column(name = "Email", length = 35)
    private String email;

    @Column(name = "Phone", length = 10, columnDefinition = "char(10)")
    private String phone;

    @Column(name = "DoB") 
    private Date dob;

    @Column(name = "Gender", length = 1, columnDefinition = "char(1)")
    private String gender;

    @Column(name = "Nationality", length = 25)
    private String nationality;

    @Column(name = "Address1", length = 50)
    private String address1;

    @Column(name = "Address2", length = 50)
    private String address2;

    @Column(name = "Address3", length = 50)
    private String address3;

    @Column(name = "UserCode", length = 10, columnDefinition = "char(10)")
    private String userCode;

    @Column(name = "EntDate")
    private Date entryDate;

    @Column(name = "EntTime", length = 8, columnDefinition = "char(8)")
    private String entryTime;

    @Column(name = "ModiUser", length = 4, columnDefinition = "char(4)")
    private String modifyUser;

    @Column(name = "ModiDate")
    private Date modiDate;

    @Column(name = "ModiTime", length = 8, columnDefinition = "char(8)")
    private String modiTime;

    @Column(name="Status", length = 1, columnDefinition = "char(1)")
    private String status;
}
