package com.asadabdalla.soccerplayer.models;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @NotBlank
    private String name;
    @Column
    @NotBlank
    private String team;
    @Column
    @NotBlank
    private String img;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
}
