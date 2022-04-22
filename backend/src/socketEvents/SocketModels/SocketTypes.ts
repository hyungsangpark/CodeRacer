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

export type JoinLobbyResponse = {
  playerNames: string[];
}

export type LeaveLobbyDTO = {
  lobbyID: string;
}