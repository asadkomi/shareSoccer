package com.asadabdalla.soccerplayer.controllers;

import com.asadabdalla.soccerplayer.models.Player;
import com.asadabdalla.soccerplayer.repositories.PlayerRepository;
import com.asadabdalla.soccerplayer.services.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/players")
public class PlayerController {

    private final PlayerRepository playerRepository;
    private final PlayerService playerService;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public void addPlayer(@RequestBody Player player) {
        playerService.addPlayer(player);
    }

    @DeleteMapping(path = "{playerId}")
    public void deletePlayer(@PathVariable("playerId") Long playerId) {
        playerService.deletePlayer(playerId);
    }
}
