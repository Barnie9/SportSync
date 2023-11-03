package com.example.sportssync_be.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_organizer", referencedColumnName = "id")
    private User organizer;

    @ManyToOne
    @JoinColumn(name = "id_sport", referencedColumnName = "id")
    private Sport sport;

    @Column
    private String description;

    @Column
    private LocalDateTime datetime;

    @Column
    private String location;

    @Column
    private Integer maxPlayers;

    @Column
    private Integer currentPlayers;

    @Column
    private String type;

    @Column
    private Double price;

    @OneToMany(mappedBy = "event")
    private List<Entry> entryList;

}
