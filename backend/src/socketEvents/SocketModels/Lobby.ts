import Player from "./Player";

class Lobby {
  private players: Player[];
  private lobbyID: string;
  private host: Player | null;

  constructor() {
    this.players = [];
    this.lobbyID = this.generateRandomID();
    this.host = null;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    this.players = this.players.filter(p => p.getSocketID() !== player.getSocketID());
  }

  generateRandomID(): string {
    return Math.random().toString(36).substring(7);
  }

  getLobbyID(): string {
    return this.lobbyID;
  }

  setHost(player: Player) {
    this.host = player;
  }

  getPlayerNames(): string[] {
    return this.players.map(p => p.getPlayerName());
  }

  getPlayerBySocketID(socketID: string): Player | null {
    return this.players.find(p => p.getSocketID() === socketID) || null;
  }
}

export default Lobby;