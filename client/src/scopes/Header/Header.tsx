import React from "react";
import "./Header.css";
import AppHeader from "./AppHeader";
import LoginHeader from "./LoginHeader";

const Header = ({ isLogged }: { isLogged: string }) => {
  return <>{isLogged ? <AppHeader /> : <LoginHeader />}</>;
};

export default Header;
