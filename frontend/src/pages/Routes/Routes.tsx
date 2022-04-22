import React from 'react';
import {Route, Routes as Switch} from 'react-router-dom';
import ExamplePage from "../ExamplePage/ExamplePage";
import SoloGamePage from "../SoloGamePage/SoloGamePage";
import TestSocketPage from "../TestSocketPage/TestSocketPage";
import MultiplayerGamePage from "../MultiplayerGamePage/MultiplayerGamePage";
import LobbyPage from "../LobbyPage/LobbyPage";

function Routes() {
  return (
    <Switch>
      <Route path="/sockettest" element={<TestSocketPage/>}/>
      <Route path="/solo" element={<SoloGamePage/>}/>
      <Route path="/multiplayer" element={<MultiplayerGamePage/>}/>
      <Route path="/lobby" element={<LobbyPage/>}/>
      <Route path="/" element={<ExamplePage/>}/>
    </Switch>
  );
}

export default Routes;