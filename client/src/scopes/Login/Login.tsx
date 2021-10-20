import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { User } from "../../models/User";

import "./Login.css";

type ResponseData = {
  jwt: string;
  user: User;
};

type nullableBoolean = boolean | null;

export default function Login() {
  const history = useHistory();
  const { setToken, setUser } = useAppContext();
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const [username, setUsername] = useState("");

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

  useEffect(() => {
    setToken(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    if (!data.username && !data.password) return;
    const response: AxiosResponse<ResponseData, any> = await axios.post(
      "/login",
      data
    );
    const token: string = response.data.jwt;
    const user: User = response.data.user;
    setToken(token);
    setUser(user);
    history.push(`/orders?token=${token}`);
  };

  const handleUserNameChange = (e) => {
    e.preventDefault();
    /* if (e.target.value.length >= 10) {
      return;
    } */
    setUsername(e.target.value);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={handleUserNameChange}
          ></input>
        </div>
        <div className="inputGroup">
          <label htmlFor="username">Password</label>
          <input id="password" type="text" placeholder="Jz6JA26v"></input>
        </div>
        <button type="submit">Login</button>
        <h1 className={connected ? "success" : "danger"}>
          {connected === true && "connected"}
          {connected === false && "not connected"}
        </h1>
      </form>
    </div>
  );
}
