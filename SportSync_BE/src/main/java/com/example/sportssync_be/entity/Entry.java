package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relations
    @ManyToOne
    @JoinColumn(name = "id_event", referencedColumnName = "id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;
}
