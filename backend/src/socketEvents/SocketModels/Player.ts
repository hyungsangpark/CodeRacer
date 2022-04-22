class Player {
  private socketID: string;
  private roomId: string;
  private playerName: string;
  private isHost: boolean;

  constructor(socketID: string, roomId: string, playerName: string, isHost: boolean) {
    this.socketID = socketID;
    this.roomId = roomId;
    this.playerName = playerName;
    this.isHost = isHost;
  }

  public getSocketID(): string {
    return this.socketID;
  }

  getPlayerName(): string {
    return this.playerName;
  }
}

export default Player;