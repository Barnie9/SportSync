package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relations
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_rating", referencedColumnName = "id")
    private Rating rating;

    // Credentials
    @Column
    private String username;

    @Column
    private String emailAddress;

    @Column
    private String password;

    // Details
    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private LocalDate birthDate;

    @Column
    private String phoneNumber;

    @Column
    private String foot;

    @Column
    private String position;

    @Column
    private String profilePicturePath;

    // Activation
    @Column
    private String token;

    @Column
    private Boolean isConfirmed;

    @Column
    private Date createdAt;
}
