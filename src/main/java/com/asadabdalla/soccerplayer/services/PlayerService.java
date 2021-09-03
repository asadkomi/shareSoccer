package com.asadabdalla.soccerplayer.services;

import com.asadabdalla.soccerplayer.exceptions.BadRequestException;
import com.asadabdalla.soccerplayer.exceptions.PlayerNotFoundException;
import com.asadabdalla.soccerplayer.models.Player;
import com.asadabdalla.soccerplayer.repositories.PlayerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public void addPlayer(Player player) {
        Boolean nameExist = playerRepository.selectNameExist(player.getName());
        if(nameExist) {
            throw new BadRequestException(
                    "Player with name " + player.getName() + " already exist"
            );
        }
        playerRepository.save(player);
    }

    public void deletePlayer(Long playerId) {
        if(!playerRepository.existsById(playerId)){
            throw new PlayerNotFoundException(
                    "Player with id " + playerId + " does not exist"
            );
        }
        playerRepository.deleteById(playerId);
    }
}
