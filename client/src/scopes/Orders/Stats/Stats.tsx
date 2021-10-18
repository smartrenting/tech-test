import React, { useEffect } from "react";
import "./Stats.css";
import { useAppContext } from "../../../contexts/AppContext";
import { getAllUserQuantity, getTopThreeUser } from "./helper";

const Stats = () => {
  const { ordersState } = useAppContext();
  const topThree = getTopThreeUser(ordersState.orders);

  return (
    <div className="stats">
      <div className="topThree">
        {topThree[1] && (
          <div className="top">
            <div>{`${topThree[1][0]}`}</div>
            <div>{`${topThree[1][1]}`}</div>
          </div>
        )}
        {topThree[0] && (
          <div className="top">
            <div>{`${topThree[0][0]}`}</div>
            <div>{`${topThree[0][1]}`}</div>
          </div>
        )}
        {topThree[2] && (
          <div className="top">
            <div>{`${topThree[2][0]}`}</div>
            <div>{`${topThree[2][1]}`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
