import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import ExamplePage from "../ExamplePage/ExamplePage";
import SoloGamePage from "../SoloGamePage/SoloGamePage";

function Routes() {
    return (
        <Switch>
            <Route path="/solotest" element={<SoloGamePage/>} />
            <Route path="/" element={<ExamplePage />}/>
        </Switch>
    );
}

export default Routes;