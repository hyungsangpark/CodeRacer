import React from "react";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import ExamplePage from "../ExamplePage/ExamplePage";
import SoloGamePage from "../SoloGamePage/SoloGamePage";
import TestSocketPage from "../TestSocketPage/TestSocketPage";
import MultiplayerGamePage from "../MultiplayerGamePage/MultiplayerGamePage";
import LobbyPage from "../LobbyPage/LobbyPage";
import Header from "../../components/Header/Header";
import GameEndPage from "../GameEndPage/GameEndPage";

function Routes() {
  return (
    <Switch>

      <Route path="/" element={<Header />}>
        {/* Later we should change below ExamplePage to main page. */}
        <Route index element={<ExamplePage />} />
        <Route path="sockettest" element={<TestSocketPage />} />
        <Route path="solo" element={<SoloGamePage />} />
        <Route path="multiplayer" element={<MultiplayerGamePage />} />
        <Route path="lobby" element={<LobbyPage />} />
        <Route path="/multigameend" element={<GameEndPage/>}/>

        {/* If an invalid link is input, re-direct to main page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
