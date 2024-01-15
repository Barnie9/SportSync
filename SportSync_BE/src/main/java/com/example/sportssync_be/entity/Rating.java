package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stats
    @Column
    private Integer pace;

    @Column
    private Integer shooting;

    @Column
    private Integer passing;

    @Column
    private Integer dribbling;

    @Column
    private Integer defending;

    @Column
    private Integer physical;
}
