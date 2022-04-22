import React, { useState, createContext, ReactChildren, ReactChild } from 'react';
import io, {Socket} from 'socket.io-client';
import {
    CreateLobbyDTO,
    CreateLobbyResponse,
    JoinLobbyDTO,
    JoinLobbyResponse,
    SocketContextType
} from "../../utils/Types/SocketTypes";

export const SocketContext = createContext<SocketContextType | null>(null);

interface AuxProps {
    children: any;
}

export function SocketContextProvider({ children }: AuxProps) {
    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState(false);

    const emitAnotherExampleEvent = (data: string) => {
        socket?.emit('anotherExampleEvent', data);
    }

    const onAnotherExampleEvent = (callback: (data: string) => void) => {
        socket?.on('anotherExampleEvent', callback);
    }

    const createLobby = (data: CreateLobbyDTO) => {
        socket?.emit('createLobby', data);
    }

    const onCreateLobby = (callback: (data: CreateLobbyResponse) => void) => {
        socket?.on('lobbyCreated', callback);
    }

    const joinLobby = (data: JoinLobbyDTO) => {
        socket?.emit('joinLobby', data);
    }

    const onJoinLobby = (callback: (data: JoinLobbyResponse) => void) => {
        socket?.on('lobbyJoined', callback);
    }

    const leaveLobby = () => {
        socket?.emit('leaveLobby');
    }

    const connect = () => {
        const newSocket = io(`${process.env.REACT_APP_SOCKET_IO}`, {
            transports: ['websocket'],
        });

        setSocket(newSocket);
        setConnected(true);
    };

    const disconnect = () => {
        leaveLobby();

        socket?.disconnect();
        setSocket(undefined);
        setConnected(false);
    };

    const context:SocketContextType = {
        // values
        connected,

        // functions
        connect,
        disconnect,
        emitAnotherExampleEvent,
        createLobby,
        joinLobby,
        leaveLobby,

        // listeners
        onAnotherExampleEvent,
        onCreateLobby,
        onJoinLobby,
    };

    return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}