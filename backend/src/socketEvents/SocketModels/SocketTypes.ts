export type CreateLobbyDTO = {
  playerName: string;
}

export type CreateLobbyResponse = {
  lobbyID: string;
}

export type JoinLobbyDTO = {
  playerName: string;
  lobbyID: string;
}

export type CompleteGameDTO = {
  lobbyID: string;
}

export type PlayersResponse = {
  players: PlayerResponse[];
}

export type PlayerResponse = {
  playerName: string;
  socketID: string;
  playerStats: PlayerStats;
  isReady: boolean;
  isHost: boolean;
}

export type ReadyLobbyDTO = {
  lobbyID: string;
}

export type PlayerProgressDTO = {
  lobbyID: string;
  CPM: number;
  Accuracy: number;
  Errors: number;
  Progress: number;
}

export type PlayerStats = {
  CPM: number;
  Accuracy: number;
  Errors: number;
  Progress: number;
}

export type StartGameDTO = {
  lobbyID: string;
}