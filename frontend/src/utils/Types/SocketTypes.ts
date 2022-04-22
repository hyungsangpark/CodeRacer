export type SocketContextType = {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emitAnotherExampleEvent: (data: any) => void;
  onAnotherExampleEvent: (callback: (data: any) => void) => void;
  createLobby: (data: CreateLobbyDTO) => void;
  joinLobby: (data: JoinLobbyDTO) => void;
  leaveLobby: () => void;
  onCreateLobby: (callback: (data: CreateLobbyResponse) => void) => void;
  onJoinLobby: (callback: (data: JoinLobbyResponse) => void) => void;
}

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