package com.example.sportssync_be.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @OneToMany(mappedBy = "sport")
    private List<Event> eventList;

}
