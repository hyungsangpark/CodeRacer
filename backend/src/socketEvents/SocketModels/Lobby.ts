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

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(player: Player) {
    this.players = this.players.filter(p => p.getSocketID() !== player.getSocketID());
  }

  public generateRandomID(): string {
    return Math.random().toString(36).substring(7);
  }

  public generateRandomUserName(): string {
    return `Uaena_${this.players.length + 1}`;
  }

  public getLobbyID(): string {
    return this.lobbyID;
  }

  public setHost(player: Player) {
    this.host = player;
  }

  public getHost(): Player | null {
    return this.host;
  }

  public getPlayerBySocketID(socketID: string): Player | null {
    return this.players.find(p => p.getSocketID() === socketID) || null;
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}

export default Lobby;