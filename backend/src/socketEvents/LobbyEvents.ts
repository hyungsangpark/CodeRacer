import {Server, Socket} from "socket.io";
import LobbyManager from "./SocketModels/LobbyManager";
import Player from "./SocketModels/Player";
import {
  CompleteGameDTO,
  CreateLobbyDTO,
  CreateLobbyResponse,
  JoinLobbyDTO,
  PlayerProgressDTO,
  PlayersResponse,
  ReadyLobbyDTO,
  StartGameDTO, StartGameResponse,
} from "./SocketModels/SocketTypes";
import Logger from "../util/Logger";
import lobby from "./SocketModels/Lobby";
import CodeBlock from "../models/CodeBlock";

function createLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("createLobby", (createLobby: CreateLobbyDTO) => {
    const lobbyID = lobbyManager.createNewLobby();
    const host = new Player(socket.id, lobbyID, createLobby.playerName, true);

    lobbyManager.setHost(lobbyID, host);
    lobbyManager.addPlayer(lobbyID, host);

    socket.join(lobbyID);

    const response: CreateLobbyResponse = {
      lobbyID
    };

    io.in(lobbyID).emit("lobbyCreated", response);
    io.in(lobbyID).emit('lobbyJoined', lobbyPlayersToResponse([host], host));
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

    lobbyManager.addPlayer(joinLobbyDTO.lobbyID, player);
    socket.join(lobby.getLobbyID());

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

function readyLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("readyLobby", (readyLobbyDTO: ReadyLobbyDTO) => {
    const lobby = lobbyManager.getLobby(readyLobbyDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.flipIsReady();

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

function startGame(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("startGame", (startGameDTO: StartGameDTO) => {
    const lobby = lobbyManager.getLobby(startGameDTO.lobbyID);

    if (lobby?.getStarted()) {
      Logger.error("Lobby already started");

      return;
    }

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    lobby?.setStarted(true);

    const {language, time} = startGameDTO.settings;

    CodeBlock.find({language, time}).then(codeBlocks => {
      const randomisedCodeBlocks = codeBlocks.sort(() => 0.5 - Math.random());

      if (randomisedCodeBlocks.length === 0) {
        Logger.error("No code blocks found");
        return;
      }

      const response: StartGameResponse = {
        ...lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()),
        code: randomisedCodeBlocks[0].code,
        language: language,
      }

      io.in(lobby.getLobbyID()).emit('gameStart', response);
    });
  })
}

function receivePlayerProgress(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("updatePlayerProgress", (playerProgressDTO: PlayerProgressDTO) => {
    const lobby = lobbyManager.getLobby(playerProgressDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.updateStats({
      CPM: playerProgressDTO.CPM,
      Accuracy: playerProgressDTO.Accuracy,
      Errors: playerProgressDTO.Errors,
      Progress: playerProgressDTO.Progress,
    });

    io.in(lobby.getLobbyID()).emit('playerProgressUpdate', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  })
}

function gameComplete(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  socket.on("completeGame", (gameCompleteDTO: CompleteGameDTO) => {
    const lobby = lobbyManager.getLobby(gameCompleteDTO.lobbyID);

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    const player = lobby.getPlayerBySocketID(socket.id);

    player?.setFinished(true);

    if (lobby.getPlayers().every(player => player.isFinished())) {
      io.in(lobby.getLobbyID()).emit('gameComplete', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
      lobby?.setStarted(false);
    }
  })
}

function leaveLobby(io: Server, socket: Socket, lobbyManager: LobbyManager) {
  const disconnectSocket = () => {
    const playerLobby = lobbyManager.getLobbyByPlayerSocketID(socket.id);

    const player = playerLobby?.player;
    const lobby = playerLobby?.lobby;

    if (lobby === undefined) {
      Logger.error("Lobby does not exist");
      return;
    }

    if (player === undefined || player == null) {
      Logger.error("Player does not exist");
      return;
    }


    lobby.removePlayer(player);

    if (lobby.getHost() === player && lobby.getPlayers().length >= 1) {
      lobbyManager.setHost(lobby.getLobbyID(), lobby.getPlayers()[0]);
    }

    socket.leave(lobby.getLobbyID());

    if (lobby.getStarted() && lobby.getPlayers().length <= 2) {
      if (lobby.getPlayers().every(player => player.isFinished())) {
        io.in(lobby.getLobbyID()).emit('gameComplete', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
        lobby?.setStarted(false);
      }
    }

    io.in(lobby.getLobbyID()).emit('lobbyJoined', lobbyPlayersToResponse(lobby.getPlayers(), lobby.getHost()));
  }

  socket.on("leaveLobby", disconnectSocket);
  socket.on("disconnect", disconnectSocket);
}

const lobbyPlayersToResponse = (players: Player[], host: Player | null): PlayersResponse => {
  return {
    players: players.map(player => {
      return {
        playerName: player.getPlayerName(),
        socketID: player.getSocketID(),
        isReady: player.getIsReady(),
        isHost: host !== null && host.getSocketID() === player.getSocketID(),
        playerStats: {
          ...player.getStats(),
        }
      }
    })
  };
};

export default function (io: Server, socket: Socket, lobbyManager: LobbyManager) {
  createLobby(io, socket, lobbyManager);
  joinLobby(io, socket, lobbyManager);
  leaveLobby(io, socket, lobbyManager);
  readyLobby(io, socket, lobbyManager);
  receivePlayerProgress(io, socket, lobbyManager);
  startGame(io, socket, lobbyManager);
  gameComplete(io, socket, lobbyManager);
}