package com.asadabdalla.soccerplayer.models;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String team;
    @Column
    private String img;
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;
}
