import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Orders from "./scopes/Orders/Orders";
import axios from "./config/axios";
import Header from "./scopes/Header/Header";

// The famous nullable boolean we inherited from Java

function App() {
  const { token } = useAppContext();

  return (
    <div className="App">
      <Header isLogged={token} />
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {token && <Route path="/orders" component={Orders}></Route>}
          <Route path="*" exact>
            <Redirect to="/login" />
          </Route>
        </Switch>
        <Route path="*" component={TokenHandler}></Route>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
