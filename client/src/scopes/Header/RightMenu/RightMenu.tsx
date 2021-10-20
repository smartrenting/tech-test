import React from "react";
import "./RightMenu.css";
import Avatar from "./Avatar";
import Logout from "./Logout";

const RightMenu = () => {
  return (
    <div className="rightMenu">
      <Avatar />
      <Logout />
    </div>
  );
};

export default RightMenu;
