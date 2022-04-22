import {Server, Socket} from "socket.io";
import LobbyManager from "./SocketModels/LobbyManager";
import Player from "./SocketModels/Player";
import {CreateLobbyDTO, CreateLobbyResponse, JoinLobbyDTO, JoinLobbyResponse} from "./SocketModels/SocketTypes";
import Logger from "../util/Logger";

function createLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("createLobby", (createLobby: CreateLobbyDTO) => {
    const lobbyID = lobbyManager.createNewLobby();
    const host = new Player(socket.id, lobbyID, createLobby.playerName, true);

    lobbyManager.setHost(lobbyID, host);
    lobbyManager.addPlayer(lobbyID, host);

    socket.join(lobbyID);

    const response1: CreateLobbyResponse = {
      lobbyID,
    };

    io.in(lobbyID).emit("lobbyCreated", response1);

    const response2: JoinLobbyResponse = {
      playerNames: [host.getPlayerName()],
    };

    io.in(lobbyID).emit('lobbyJoined', response2);
  })
}

function joinLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("joinLobby", (joinLobbyDTO: JoinLobbyDTO) => {
    const lobby = lobbyManager.getLobby(joinLobbyDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = new Player(socket.id, lobby.getLobbyID(), joinLobbyDTO.playerName, false);
    lobby.addPlayer(player);

    socket.join(lobby.getLobbyID());

    const response: JoinLobbyResponse = {
      playerNames: lobby.getPlayerNames(),
    };

    io.in(lobby.getLobbyID()).emit('lobbyJoined', response);
  })
}

function leaveLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("leaveLobby", () => {
    const playerLobby = lobbyManager.getLobbyByPlayerSocketID(socket.id);

    if (playerLobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    if (playerLobby.player === null) {
      Logger.error("Player does not exist");
      return;
    }

    playerLobby.lobby.removePlayer(playerLobby.player);

    socket.leave(playerLobby.lobby.getLobbyID());

    const response: JoinLobbyResponse = {
      playerNames: playerLobby.lobby.getPlayerNames(),
    };

    io.in(playerLobby.lobby.getLobbyID()).emit('lobbyJoined', response);
  })
}

export default function (io: Server, socket: Socket, lobbyManager: LobbyManager) {
  createLobby(io, socket, lobbyManager);
  joinLobby(io, socket, lobbyManager);
  leaveLobby(io, socket, lobbyManager);
}