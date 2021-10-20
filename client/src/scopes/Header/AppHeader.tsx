import React from "react";
import Avatar from "./RightMenu/Avatar";
import RightMenu from "./RightMenu/RightMenu";

const AppHeader = () => {
  return (
    <header className={`header appHeader`}>
      <img className="logo" src="logo.png" alt="Smartpizza" />
      <RightMenu />
    </header>
  );
};

export default AppHeader;
