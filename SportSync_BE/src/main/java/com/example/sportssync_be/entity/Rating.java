package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relations
    @ManyToOne
    @JoinColumn(name = "id_event", referencedColumnName = "id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "id_rater_user", referencedColumnName = "id")
    private User raterUser;

    @ManyToOne
    @JoinColumn(name = "id_rated_user", referencedColumnName = "id")
    private User ratedUser;

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

    // Approval
    @Column
    private Boolean isApproved;
}
