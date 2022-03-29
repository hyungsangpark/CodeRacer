import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {SocketContextProvider} from "./api/sockers/Sockets";
import Routes from "./pages/Routes/Routes";

function App() {
    return (
        <SocketContextProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </SocketContextProvider>
    );
}

export default App;
