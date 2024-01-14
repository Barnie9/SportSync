package com.example.sportssync_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private LocalDate startDate;

    @Column
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", organizer=" + organizer +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", location='" + location + '\'' +
                ", fieldType='" + fieldType + '\'' +
                ", maxPlayers=" + maxPlayers +
                ", price=" + price +
                '}';
    }

    @Column
    private String location;

    @Column
    private String fieldType;

    @Column
    private Integer maxPlayers;

    @Column
    private Double price;


}
