import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SocketContextProvider} from "./api/sockers/Sockets";
import TestSocketComponent from "./api/Components/TestSocketComponent";

function App() {
    return (
        <SocketContextProvider>
            <TestSocketComponent/>
        </SocketContextProvider>
    );
}

export default App;
