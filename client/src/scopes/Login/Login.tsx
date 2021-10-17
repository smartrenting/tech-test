import { AxiosResponse } from "axios";
import React from "react";
import { useHistory } from "react-router";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { User } from "../../models/User";

import "./Login.css";

type ResponseData = {
  jwt: string;
  user: User;
};

export default function Login() {
  const history = useHistory();
  const { setToken, setUser } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
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

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text"></input>
        <label htmlFor="username">Password</label>
        <input id="password" type="text"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
