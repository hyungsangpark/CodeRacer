import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    const emitExampleEvent = (data) => {
        socket.emit('exampleEvent', data);
    }

    const emitAnotherExampleEvent = (data) => {
        socket.emit('anotherExampleEvent', data);
    }

    const onAnotherExampleEvent = (callback) => {
        socket.on('anotherExampleEvent', callback);
    }

    const connect = () => {
        const newSocket = io(`${process.env.REACT_APP_SOCKET_IO}`, {
            transports: ['websocket'],
        });

        setSocket(newSocket);
        setConnected(true);
    };

    const disconnect = () => {
        socket?.disconnect();
        setSocket(null);
        setConnected(false);
    };


    // eslint-disable-next-line react/jsx-no-constructed-context-values -- this is used so the screen can rerender when state changes
    const context = {
        // values
        connected,

        // functions
        connect,
        disconnect,
        emitExampleEvent,
        emitAnotherExampleEvent,

        // listeners
        onAnotherExampleEvent
    };

    return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}