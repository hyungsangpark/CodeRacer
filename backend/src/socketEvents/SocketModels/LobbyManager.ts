import Lobby from "./Lobby";
import Player from "./Player";

class LobbyManager {
  private lobbies: Map<string, Lobby>;

  constructor() {
    this.lobbies = new Map();
  }

  createNewLobby(): string {
    let lobby;

    while (!lobby) {
      lobby = new Lobby();

      if (this.lobbies.has(lobby.getLobbyID())) {
        lobby = null;
      }
    }

    this.lobbies.set(lobby.getLobbyID(), lobby);
    return lobby.getLobbyID();
  }

  setHost(lobbyID: string, host: Player) {
    if (this.lobbies.has(lobbyID)) {
      this.lobbies.get(lobbyID)!.setHost(host);
    }
  }

  addPlayer(lobbyID: string, player: Player) {
    if (this.lobbies.has(lobbyID)) {
      this.lobbies.get(lobbyID)!.addPlayer(player);
    }
  }

  removePlayer(lobbyID: string, player: Player) {
    if (this.lobbies.has(lobbyID)) {
      this.lobbies.get(lobbyID)!.removePlayer(player);
    }
  }

  getLobby(lobbyID: string): Lobby | undefined {
    if (this.lobbies.has(lobbyID)) {
      return this.lobbies.get(lobbyID)!;
    }
  }

  getLobbyByPlayerSocketID(playerSocketID: string): {lobby: Lobby, player: Player} | undefined {
    for (const lobby of this.lobbies.values()) {
      const player = lobby.getPlayerBySocketID(playerSocketID);

      if (player) {
        return {
          lobby,
          player
        };
      }
    }
  }

  closeLobby(lobbyID: string) {
    this.lobbies.delete(lobbyID);
  }
}

export default LobbyManager;