package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relations
    @ManyToOne
    @JoinColumn(name = "id_organizer", referencedColumnName = "id")
    private User organizer;

    // Details
    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private String location;

    @Column
    private String fieldType;

    @Column
    private Integer maxPlayers;

    @Column
    private String gender;

    @Column
    private Double price;
}
