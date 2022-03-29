import React, { useState, createContext, ReactChildren, ReactChild } from 'react';
import io, {Socket} from 'socket.io-client';

export const SocketContext = createContext<any>({});

interface AuxProps {
    children: ReactChild | ReactChildren;
}

export function SocketContextProvider({ children }: AuxProps) {
    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState(false);

    const emitAnotherExampleEvent = (data: string) => {
        socket!!.emit('anotherExampleEvent', data);
    }

    const onAnotherExampleEvent = (callback: (data: string) => void) => {
        socket!!.on('anotherExampleEvent', callback);
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
        setSocket(undefined);
        setConnected(false);
    };

    const context:any = {
        // values
        connected,

        // functions
        connect,
        disconnect,
        emitAnotherExampleEvent,

        // listeners
        onAnotherExampleEvent
    };

    return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}