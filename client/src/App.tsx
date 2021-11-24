import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Art from "./scopes/Art/Art";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { token, setToken } = useAppContext();

  useEffect(() => {
    fetch("http://localhost:4242/hello")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h5>{`Art-renting`}</h5>
        <img
          src="https://i.imgur.com/eMEdiTl.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {token && (
            <>
              <Route path="/art" component={Art}></Route>
            </>
          )}
          <Route path="*" exact>
            <h1>
              API:
              {connected === true && " connected"}
              {connected === false && " not connected"}
            </h1>
            <Link className="login" to="/login">
              Login
            </Link>
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
