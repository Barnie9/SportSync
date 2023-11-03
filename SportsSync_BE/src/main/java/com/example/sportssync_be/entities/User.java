package com.example.sportssync_be.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String profilePicture;

    @Column
    private String gender;

    @OneToMany(mappedBy = "organizer")
    private List<Event> eventList;

    @OneToMany(mappedBy = "user")
    private List<Entry> entryList;

}
