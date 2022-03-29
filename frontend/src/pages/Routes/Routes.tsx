import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import ExamplePage from "../ExamplePage/ExamplePage";

function Routes() {
    return (
        <Switch>
            <Route path="/" element={<ExamplePage />}/>
        </Switch>
    );
}

export default Routes;