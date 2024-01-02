package com.example.sportssync_be.dto;

import lombok.Data;

@Data
public class EntryDTO {
    private Long id;

    // Relations
    private Long idEvent;
    private Long idUser;
}
