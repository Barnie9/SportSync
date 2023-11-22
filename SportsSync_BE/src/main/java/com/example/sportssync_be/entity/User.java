package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Entity
@Data
public class User{

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
    private String emailAddress;

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
