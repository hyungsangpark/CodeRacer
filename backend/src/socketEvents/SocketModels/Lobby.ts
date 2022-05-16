import Player from "./Player";
import {MultiplayerSettings} from "./SocketTypes";

class Lobby {
  private players: Player[];
  private lobbyID: string;
  private host: Player | null;
  private started: boolean;
  private codeBlockId: string;

  constructor() {
    this.players = [];
    this.lobbyID = this.generateRandomID().toUpperCase();
    this.host = null;
    this.started = false;
    this.codeBlockId = "";
  }

  public setCodeBlockId(codeBlockId: string): void {
    this.codeBlockId = codeBlockId;
  }

  public getCodeBlockId(): string {
    return this.codeBlockId;
  }

  public setStarted(started: boolean) {
    this.started = started;
  }

  public getStarted():boolean {
    return this.started;
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
    return this.lobbyID.toUpperCase();
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

  public orderPlayersByRating(): void {
    this.players.sort(p => p.getRating());
  }
}

export default Lobby;