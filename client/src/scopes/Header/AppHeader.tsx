import React from "react";
import Avatar from "./Avatar/Avatar";

const AppHeader = () => {
  return (
    <header className={`header appHeader`}>
      <img className="logo" src="logo.png" alt="Smartpizza" />
      <Avatar />
    </header>
  );
};

export default AppHeader;
