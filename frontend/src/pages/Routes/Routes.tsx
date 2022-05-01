import React from "react";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import ExamplePage from "../ExamplePage/ExamplePage";
import SoloGamePage from "../SoloGamePage/SoloGamePage";
import MultiplayerGamePage from "../MultiplayerGamePage/MultiplayerGamePage";
import LobbyPage from "../LobbyPage/LobbyPage";
import Header from "../../components/Header/Header";
import GameEndPage from "../GameEndPage/GameEndPage";
import HomePage from "../HomePage/HomePage";

function Routes() {
  return (
    <Switch>

      <Route path="/" element={<Header />}>
        {/* Later we should change below ExamplePage to main page. */}
        <Route path="Example" element={<ExamplePage />} />
        <Route path="solo" element={<SoloGamePage />} />
        <Route path="multiplayer" element={<MultiplayerGamePage />} />
        <Route path="lobby" element={<LobbyPage />} />
        <Route path="results" element={<GameEndPage />} />
        <Route index element={<HomePage/>}/>

        {/* If an invalid link is input, re-direct to main page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
