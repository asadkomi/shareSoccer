package com.asadabdalla.soccerplayer.services;

import com.asadabdalla.soccerplayer.exceptions.BadRequestException;
import com.asadabdalla.soccerplayer.exceptions.PlayerNotFoundException;
import com.asadabdalla.soccerplayer.models.Gender;
import com.asadabdalla.soccerplayer.models.Player;
import com.asadabdalla.soccerplayer.repositories.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;
    private PlayerService playerService;

    @BeforeEach
    void setUp() {
        playerService = new PlayerService(playerRepository);
    }

    @Test
    void getAllPlayers() {
        playerService.getAllPlayers();
        verify(playerRepository).findAll();
    }

    @Test
    void addPlayer() {
        Player player = new Player(1l, "Sadio", "Liverpool", "img", Gender.MALE);
        playerService.addPlayer(player);
        ArgumentCaptor<Player> playerArgumentCaptor = ArgumentCaptor.forClass(Player.class);
        verify(playerRepository).save(playerArgumentCaptor.capture());

        Player capturedPlayer = playerArgumentCaptor.getValue();
        assertThat(capturedPlayer).isEqualTo(player);
    }

    @Test
    void throwExceptionWhenNameIsExist() {
        Player player = new Player(1l, "Sadio", "Liverpool", "img", Gender.MALE);
        given(playerRepository.selectNameExist(player.getName())).willReturn(true);
        assertThatThrownBy(() ->playerService.addPlayer(player))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Player with name " + player.getName() + " already exist");

        verify(playerRepository, never()).save(any());
    }

    @Test
    void deletePlayer() {
        long id = 1;
        given(playerRepository.existsById(id))
                .willReturn(true);
        playerService.deletePlayer(id);
        verify(playerRepository).deleteById(id);
    }

    @Test
    void throwExceptionWhenPlayerNotFound() {
        long id = 1;
        given(playerRepository.existsById(id))
                .willReturn(false);
        assertThatThrownBy(() -> playerService.deletePlayer(id))
                .isInstanceOf(PlayerNotFoundException.class)
                .hasMessageContaining("Player with id " + id + " does not exist");

        verify(playerRepository, never()).deleteById(any());
    }
}
