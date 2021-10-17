import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Orders from "./scopes/Orders/Orders";
import axios from "./config/axios";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { token } = useAppContext();

  useEffect(() => {
    async function checkConnection() {
      try {
        const check = await axios.get("/hello");
        if (check) setConnected(check.data === "hello");
      } catch {
        setConnected(false);
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h5>{`Smart-PIZZA`}</h5>
        <img
          src="https://i.imgur.com/UJWKS5T.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {token && (
            <>
              <Route path="/orders" component={Orders}></Route>
              <Link to="/login">logout</Link>
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
