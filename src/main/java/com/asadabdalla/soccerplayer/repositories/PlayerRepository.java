package com.asadabdalla.soccerplayer.repositories;

import com.asadabdalla.soccerplayer.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Player s WHERE s.name = ?1")
    Boolean selectNameExist(String name);
}
