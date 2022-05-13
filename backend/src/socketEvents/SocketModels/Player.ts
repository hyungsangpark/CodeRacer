import {PlayerProgressDTO, PlayerStats} from "./SocketTypes";

class Player {
  private socketID: string;
  private roomId: string;
  private playerName: string;
  private isHost: boolean;
  private isReady: boolean;
  private CPM: number;
  private accuracy: number;
  private errors: number;
  private progress: number;
  private finished: boolean;

  constructor(socketID: string, roomId: string, playerName: string, isHost: boolean) {
    this.socketID = socketID;
    this.roomId = roomId;
    this.playerName = playerName;
    this.isHost = isHost;
    this.isReady = false;
    this.finished = false;
    
    this.CPM = 0;
    this.accuracy = 0;
    this.errors = 0;
    this.progress = 0;
  }

  public setFinished(finished: boolean) {
    this.finished = finished;
  }

  public isFinished(): boolean {
    return this.finished;
  }

  public getStats(): PlayerStats {
    return {
      CPM: this.CPM,
      Accuracy: this.accuracy,
      Errors: this.errors,
      Progress: this.progress
    }
  }

  public getRating(): number {
    return this.progress * (this.CPM + this.accuracy);
  }

  public updateStats(newStats: PlayerStats) {
    this.CPM = newStats.CPM;
    this.accuracy = newStats.Accuracy;
    this.errors = newStats.Errors;
    this.progress = newStats.Progress;
  }

  public flipIsReady(): void {
    this.isReady = !this.isReady;
  }

  public getSocketID(): string {
    return this.socketID;
  }

  public getIsReady(): boolean {
    return this.isReady;
  }

  public getPlayerName(): string {
    return this.playerName;
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }
}

export default Player;